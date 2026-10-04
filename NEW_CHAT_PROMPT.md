# NEW CHAT PROMPT — HONESTY ERP Design Lab

استخدم هذا النص كأول رسالة في أي محادثة ChatGPT جديدة داخل المشروع:

---

نحن نكمل مشروع **HONESTY ERP Design Lab** ولا نبدأ من الصفر.

قبل أن تسألني أي سؤال عن التاريخ أو الحالة، اقرأ ملفات المشروع التالية بالترتيب
من الـrepo الحالي:

1. `README_FIRST.md`
2. `CURRENT_EXECUTION_STATE.md`
3. `NEW_CHAT_HANDOFF.md`
4. `DECISIONS_AND_CONSTRAINTS.md`
5. `GIT_CHECKPOINTS.md`
6. `AGENTS.md`
7. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
8. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`
9. `src/app/controls/NEXT_COMPONENT_REFERENCE_BATCH_V1.md`
10. `src/app/controls/FIELD_FAMILY_V1.md`
11. `src/app/controls/check-box/CHECK_BOX_REFERENCE_EXACT_V5.md`

بعد ذلك تحقق من **live GitHub main** مباشرة ولا تعتمد على SHA قديم داخل chat.

لا تطلب مني إعادة سرد تاريخ المشروع إذا كانت الملفات تغطيه.

تعامل مع القواعد التالية كملزمة:

- أنا Product Owner والسلطة النهائية بصريًا ومنتجيًا.
- technical PASS لا يساوي visual approval.
- لا نفتح مكوّنًا جديدًا قبل إغلاق مشاكل المكوّن الحالي.
- التنفيذ من الأسفل للأعلى حسب dependencies.
- أي مكوّن بصري جديد يحتاج مرجعًا بصريًا أحدده أنا أو إذنًا صريحًا مني للعمل
  بدون مرجع.
- ألوان النظام تأتي من Honesty ERP tokens حتى عندما يكون التصميم مأخوذًا من
  مرجع خارجي، ما لم أقرر غير ذلك.
- `npm run verify:clean` هو الـcanonical technical gate.
- لا ترفع أو تعطل quality/style budgets للحصول على green.

**مهم جدًا:** بعد كل قرار/تنفيذ/blocker/verification/visual finding/stage change،
يجب تحديث ملفات السياق والتنفيذ والمراحل في نفس دورة العمل قبل التسليم، وعلى
الأقل:

- `CURRENT_EXECUTION_STATE.md`
- `README_FIRST.md`
- `NEW_CHAT_HANDOFF.md`
- `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`
- `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`

وكذلك `DECISIONS_AND_CONSTRAINTS.md` و`GIT_CHECKPOINTS.md` والعقود الخاصة
بالمكوّن/المرحلة عندما تتغير موضوعاتها.

الحالة الحالية يجب أن تؤخذ من `CURRENT_EXECUTION_STATE.md` ومن live GitHub،
وليس من رسائل المحادثة القديمة.

بعد القراءة، أعطني في رد واحد فقط:

1. live main HEAD؛
2. active component؛
3. آخر technical gate وحالته؛
4. Product Owner visual state؛
5. immediate next action؛
6. ما الذي **غير مسموح** ببدئه الآن.

ولا تبدأ تنفيذًا جديدًا قبل تثبيت هذه الحالة.

---
