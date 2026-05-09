## 2024-05-14 - Keyboard Navigation and Form Status
**Learning:** Found that custom brutalist interfaces using heavy `outline: none` often forget to re-implement `:focus-visible` for keyboard users, making navigation nearly impossible. Additionally, dynamic form messages without `aria-live` fail to alert screen readers of success or error.
**Action:** Always ensure a fallback `:focus-visible` ring (styled to match the aesthetic) is present if default outlines are removed, and always apply `aria-live` to dynamically updated status containers.
