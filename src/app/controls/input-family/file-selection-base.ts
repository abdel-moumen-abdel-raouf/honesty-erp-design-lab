import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  input,
  signal,
} from '@angular/core';
import {
  ErpInputConfigurationState,
  ErpInputValidationIssue,
} from './input-contracts';
import {ErpFieldBase} from './field-base';

type FileRejectionReason = 'accept' | 'count' | 'size';

@Directive()
export abstract class ErpFileSelectionBase extends ErpFieldBase<
  readonly File[]
> {
  readonly accept = input<string | null>(null);
  readonly maxFileSize = input<number | null>(null);
  readonly minFiles = input<number | null>(null);
  readonly maxFiles = input<number | null>(null);
  override readonly clearable = input(true, {transform: booleanAttribute});

  private readonly dragDepth = signal(0);
  private readonly policyFeedbackState = signal<string | null>(null);
  private readonly rejectionIssuesState =
    signal<readonly ErpInputValidationIssue[]>([]);

  protected readonly selectedFiles = this.currentValue;
  protected readonly dragActive = computed(() => this.dragDepth() > 0);
  protected readonly policyFeedback = this.policyFeedbackState.asReadonly();
  protected readonly selectionConfigurationState =
    computed<ErpInputConfigurationState>(() => {
      const maxFileSize = this.maxFileSize();
      const minFiles = this.minFiles();
      const maxFiles = this.maxFiles();
      const validMaxFileSize =
        maxFileSize === null ||
        (Number.isFinite(maxFileSize) && maxFileSize > 0);
      const validMinFiles =
        minFiles === null ||
        (Number.isInteger(minFiles) && minFiles >= 0);
      const validMaxFiles =
        maxFiles === null ||
        (Number.isInteger(maxFiles) && maxFiles > 0);
      const validRange =
        minFiles === null ||
        maxFiles === null ||
        minFiles <= maxFiles;

      return this.fieldConfigurationState() === 'ready' &&
        validMaxFileSize &&
        validMinFiles &&
        validMaxFiles &&
        validRange
        ? 'ready'
        : 'invalid';
    });
  protected readonly selectionEffectiveDisabled = computed(
    () =>
      this.fieldEffectiveDisabled() ||
      this.selectionConfigurationState() === 'invalid',
  );
  protected readonly guidanceText = computed(() => {
    const guidance: string[] = [];
    const accept = this.accept()?.trim();
    const maxFileSize = this.maxFileSize();
    const maxFiles = this.maxFiles();

    if (accept) {
      guidance.push(`الأنواع المقبولة: ${accept}`);
    }
    if (maxFileSize !== null && maxFileSize > 0) {
      guidance.push(`الحد الأقصى للحجم: ${this.formatFileSize(maxFileSize)}`);
    }
    if (maxFiles !== null && maxFiles > 0) {
      guidance.push(`الحد الأقصى للملفات: ${maxFiles}`);
    }

    return guidance.length > 0
      ? guidance.join(' · ')
      : 'يمكن اختيار عدة ملفات وإضافتها على دفعات.';
  });
  protected readonly clearAllVisible = computed(
    () =>
      this.clearable() &&
      this.selectedFiles().length > 0 &&
      !this.selectionEffectiveDisabled(),
  );

  protected constructor() {
    super(Object.freeze([]) as readonly File[]);

    effect(() => {
      if (this.selectionEffectiveDisabled()) {
        this.dragDepth.set(0);
        this.clearFocusState();
      }
    });
  }

  override writeValue(value: unknown): void {
    super.writeValue(value);
    this.policyFeedbackState.set(null);
    this.rejectionIssuesState.set([]);
    this.selectionChanged(this.selectedFiles());
  }

  protected override classifyPresence(value: unknown) {
    return Array.isArray(value) && value.length === 0
      ? 'no-selection' as const
      : null;
  }

  protected override validateCandidate(
    value: unknown,
  ): readonly ErpInputValidationIssue[] {
    const files = Array.isArray(value)
      ? value.filter((candidate): candidate is File => candidate instanceof File)
      : [];
    const issues: ErpInputValidationIssue[] = [
      ...this.rejectionIssuesState(),
    ];
    const minFiles = this.minFiles();
    const maxFiles = this.maxFiles();

    if (minFiles !== null && files.length < minFiles) {
      issues.push(
        this.validationIssue(
          'files.min-count',
          `يجب اختيار ${minFiles} ملفًا على الأقل.`,
          'constraint',
          {minFiles, actualCount: files.length},
        ),
      );
    }

    if (maxFiles !== null && files.length > maxFiles) {
      issues.push(
        this.validationIssue(
          'files.max-count',
          `لا يمكن اختيار أكثر من ${maxFiles} ملفًا.`,
          'constraint',
          {maxFiles, actualCount: files.length},
        ),
      );
    }

    const invalidTypes = files.filter((file) => !this.acceptsFile(file));
    if (invalidTypes.length > 0) {
      issues.push(
        this.validationIssue(
          'files.type',
          'يوجد ملف واحد أو أكثر من نوع غير مسموح.',
          'domain',
          {invalidCount: invalidTypes.length},
        ),
      );
    }

    const maxFileSize = this.maxFileSize();
    if (maxFileSize !== null) {
      const oversized = files.filter((file) => file.size > maxFileSize);
      if (oversized.length > 0) {
        issues.push(
          this.validationIssue(
            'files.max-size',
            'يوجد ملف واحد أو أكثر يتجاوز الحد الأقصى للحجم.',
            'constraint',
            {
              maxFileSize,
              invalidCount: oversized.length,
            },
          ),
        );
      }
    }

    return issues;
  }

  protected override normalizeValue(value: unknown): readonly File[] {
    if (!Array.isArray(value)) {
      return Object.freeze([]) as readonly File[];
    }

    const unique = new Map<string, File>();
    for (const candidate of value) {
      if (candidate instanceof File) {
        unique.set(this.fileIdentity(candidate), candidate);
      }
    }

    return Object.freeze([...unique.values()]);
  }

  protected override commitUserValue(value: unknown): boolean {
    if (this.selectionEffectiveDisabled()) {
      return false;
    }

    const committed = super.commitUserValue(value);
    if (committed) {
      this.selectionChanged(this.selectedFiles());
    }
    return committed;
  }

  protected openNativePicker(inputElement: HTMLInputElement): void {
    if (!this.selectionEffectiveDisabled()) {
      inputElement.click();
    }
  }

  protected handleNativeSelection(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.addFiles(Array.from(inputElement.files ?? []));
    inputElement.value = '';
  }

  protected handleDragEnter(event: DragEvent): void {
    event.preventDefault();
    if (!this.selectionEffectiveDisabled()) {
      this.dragDepth.update((depth) => depth + 1);
    }
  }

  protected handleDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.selectionEffectiveDisabled() && event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  protected handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth.update((depth) => Math.max(0, depth - 1));
  }

  protected handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth.set(0);
    if (!this.selectionEffectiveDisabled()) {
      this.addFiles(Array.from(event.dataTransfer?.files ?? []));
    }
  }

  protected removeFile(file: File): void {
    if (!this.clearable() || this.selectionEffectiveDisabled()) {
      return;
    }

    const identity = this.fileIdentity(file);
    const next = this.selectedFiles().filter(
      (candidate) => this.fileIdentity(candidate) !== identity,
    );
    if (this.commitUserValue(next)) {
      this.policyFeedbackState.set(null);
      this.rejectionIssuesState.set([]);
    }
  }

  protected clearAll(inputElement: HTMLInputElement): void {
    if (!this.clearAllVisible() || !this.commitUserValue([])) {
      return;
    }

    inputElement.value = '';
    this.policyFeedbackState.set(null);
    this.rejectionIssuesState.set([]);
  }

  protected fileIdentity(file: File): string {
    return [file.name, file.size, file.lastModified, file.type].join('\u0000');
  }

  protected fileSupportingText(file: File): string {
    if (file.type) {
      return file.type;
    }

    const extension = file.name.includes('.')
      ? file.name.split('.').at(-1)?.toUpperCase()
      : null;
    return extension ? `ملف ${extension}` : 'ملف';
  }

  protected formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} بايت`;
    }
    if (bytes < 1024 * 1024) {
      return `${this.formatUnit(bytes / 1024)} كيلوبايت`;
    }
    if (bytes < 1024 * 1024 * 1024) {
      return `${this.formatUnit(bytes / (1024 * 1024))} ميجابايت`;
    }
    return `${this.formatUnit(bytes / (1024 * 1024 * 1024))} جيجابايت`;
  }

  protected selectionChanged(files: readonly File[]): void {
    void files;
  }

  private addFiles(files: readonly File[]): void {
    if (files.length === 0 || this.selectionEffectiveDisabled()) {
      return;
    }

    const current = this.selectedFiles();
    const existing = new Set(current.map((file) => this.fileIdentity(file)));
    const accepted: File[] = [];
    const rejected = new Set<FileRejectionReason>();
    const maxFiles = this.maxFiles();

    for (const file of files) {
      const identity = this.fileIdentity(file);
      if (existing.has(identity)) {
        continue;
      }
      if (!this.acceptsFile(file)) {
        rejected.add('accept');
        continue;
      }
      const maxFileSize = this.maxFileSize();
      if (maxFileSize !== null && file.size > maxFileSize) {
        rejected.add('size');
        continue;
      }
      if (maxFiles !== null && current.length + accepted.length >= maxFiles) {
        rejected.add('count');
        continue;
      }

      existing.add(identity);
      accepted.push(file);
    }

    if (accepted.length > 0) {
      this.commitUserValue([...current, ...accepted]);
    }
    this.policyFeedbackState.set(this.rejectionMessage(rejected));
    this.rejectionIssuesState.set(this.rejectionIssues(rejected));
  }

  private acceptsFile(file: File): boolean {
    const accept = this.accept()?.trim();
    if (!accept) {
      return true;
    }

    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    return accept
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean)
      .some((entry) => {
        if (entry.startsWith('.')) {
          return fileName.endsWith(entry);
        }
        if (entry.endsWith('/*')) {
          return fileType.startsWith(entry.slice(0, -1));
        }
        return fileType === entry;
      });
  }

  private rejectionIssues(
    rejected: ReadonlySet<FileRejectionReason>,
  ): readonly ErpInputValidationIssue[] {
    const issues: ErpInputValidationIssue[] = [];

    if (rejected.has('accept')) {
      issues.push(
        this.validationIssue(
          'files.type',
          'تعذر إضافة ملفات من نوع غير مسموح.',
          'domain',
        ),
      );
    }

    if (rejected.has('size')) {
      issues.push(
        this.validationIssue(
          'files.max-size',
          'تعذر إضافة ملفات تتجاوز الحد الأقصى للحجم.',
          'constraint',
          {maxFileSize: this.maxFileSize()},
        ),
      );
    }

    if (rejected.has('count')) {
      issues.push(
        this.validationIssue(
          'files.max-count',
          'تم الوصول إلى الحد الأقصى لعدد الملفات.',
          'constraint',
          {maxFiles: this.maxFiles()},
        ),
      );
    }

    return issues;
  }

  private rejectionMessage(
    rejected: ReadonlySet<FileRejectionReason>,
  ): string | null {
    const messages: string[] = [];
    if (rejected.has('accept')) {
      messages.push('تعذر إضافة ملفات من نوع غير مسموح');
    }
    if (rejected.has('size')) {
      messages.push('تعذر إضافة ملفات تتجاوز الحد الأقصى للحجم');
    }
    if (rejected.has('count')) {
      messages.push('تم الوصول إلى الحد الأقصى لعدد الملفات');
    }
    return messages.length > 0 ? `${messages.join(' · ')}.` : null;
  }

  private formatUnit(value: number): string {
    return value >= 10 || Number.isInteger(value)
      ? Math.round(value).toString()
      : value.toFixed(1);
  }
}
