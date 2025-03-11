```markdown
# Windsurf Coding Assistant Workflow v2.0

**Memory-Driven Development Protocol**

## Core Methods (Keyword-Triggered)

1. `INIT_PROJECT` - Initialize project structure
2. `LOAD_MEMORY` - Read all .windsurf files
3. `PLAN_MODE` - Architectural planning workflow
4. `ACT_MODE` - Implementation workflow
5. `UPDATE_MEMORY` - Documentation maintenance
6. `CRITIQUE_CYCLE` - Adversarial improvement process
7. `MEMORY_REFRESH` - Full context reload

```mermaid
flowchart TD
    INIT[INIT_PROJECT] --> LOAD[LOAD_MEMORY]
    LOAD --> CHECK{Project Exists?}
    CHECK -->|Yes| REVIEW[Review Existing Docs]
    CHECK -->|No| CREATE[Create Core Files]
    REVIEW/CREATE --> PLAN[PLAN_MODE]
    PLAN --> ACT[ACT_MODE]
    ACT --> UPDATE[UPDATE_MEMORY]
    UPDATE --> MEMORY_REFRESH
```

## Method Implementation Guide

### `INIT_PROJECT`
- Create .windsurf directory structure
- Generate initial core files if missing:
  ```python
  .windsurf/
  ├── plans/
  │   ├── projectbrief.md
  │   ├── productContext.md
  │   └── systemPatterns.md
  └── context/
      ├── techContext.md
      └── progress.md
  ```

### `LOAD_MEMORY` (Automatic)
- **Required at start of every interaction**
- Read all .md files in .windsurf directory
- Validate file relationships:
  ```mermaid
  flowchart LR
    projectbrief.md --> productContext.md
    projectbrief.md --> systemPatterns.md
    productContext.md --> activeContext.md
    systemPatterns.md --> activeContext.md
  ```

### `PLAN_MODE` Workflow
```mermaid
flowchart TD
    PM_START[PLAN_MODE] --> PM_READ[LOAD_MEMORY]
    PM_READ --> PM_CHECK{Files Complete?}
    PM_CHECK -->|No| PM_CREATE[Create Missing Files]
    PM_CHECK -->|Yes| PM_STRATEGY[Develop Implementation Strategy]
    PM_STRATEGY --> PM_DOCUMENT[Update systemPatterns.md]
    PM_DOCUMENT --> PM_PRESENT[Present Architecture Plan]
```

### `ACT_MODE` Workflow
```mermaid
flowchart TD
    AM_START[ACT_MODE] --> AM_CONTEXT[LOAD_MEMORY]
    AM_CONTEXT --> AM_UPDATE[Update activeContext.md]
    AM_UPDATE --> AM_EXECUTE[Perform Implementation]
    AM_EXECUTE --> AM_LOG[Document in progress.md]
    AM_LOG --> AM_REFRESH[MEMORY_REFRESH]
```

### `UPDATE_MEMORY` Protocol
Triggered when:
1. New patterns discovered
2. Major changes implemented
3. User command: **update memory bank**
4. Context clarification needed

```mermaid
flowchart TD
    UM_START[UPDATE_MEMORY] --> UM_REVIEW[Review ALL .windsurf Files]
    UM_REVIEW --> UM_CURRENT[Update activeContext.md]
    UM_CURRENT --> UM_PROGRESS[Update progress.md]
    UM_PROGRESS --> UM_PATTERNS[Update systemPatterns.md]
    UM_PATTERNS --> UM_TECH[Update techContext.md]
```

## Execution Guidelines

1. **Always start with** `LOAD_MEMORY`
2. **For new projects**:
   ```python
   INIT_PROJECT() 
   PLAN_MODE()
   ```
3. **For existing projects**:
   ```python
   LOAD_MEMORY()
   ACT_MODE()
   ```
4. **After major changes**:
   ```python
   UPDATE_MEMORY()
   MEMORY_REFRESH()
   ```

## Required Documentation Standards

### Core Files
| File | Purpose | Update Trigger |
|------|---------|----------------|
| projectbrief.md | Foundational requirements | Project start |
| productContext.md | User goals & problems | Scope changes |
| systemPatterns.md | Architectural decisions | Design changes |
| techContext.md | Technical stack details | Dependency updates |
| activeContext.md | Current work state | Task start/end |
| progress.md | Implementation status | Task completion |

### Context Files (Optional)
- Create in `.windsurf/context/` when needed:
  - `apiSpecs.md`
  - `testingStrategy.md`
  - `deploymentProcess.md`

## Critical Behaviors
- **Never proceed** without complete Memory Bank
- **Always verify** file relationships
- **Document all decisions** in markdown
- **Use versioned updates** for critical changes
- **Maintain clear audit trails** in progress.md

## Example Interaction Flow
```python
LOAD_MEMORY()
if project_exists:
    ACT_MODE()
else:
    INIT_PROJECT()
    PLAN_MODE()
UPDATE_MEMORY()
MEMORY_REFRESH()
```

**Note:** When encountering uncertainty, default to creating new documentation rather than assuming context. All technical decisions must be traceable through Memory Bank entries.
```
