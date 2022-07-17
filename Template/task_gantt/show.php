<section id="main">
    <?= $this->projectHeader->render($project, 'TaskGanttController', 'show', false, 'Gantt') ?>
    <div class="menu-inline">
        <ul class="views">
            <li <?= $sorting === 'id' ? 'class="active"' : '' ?>>
                <?= $this->url->icon('sort-numeric-asc', t('Sort by ID'), 'TaskGanttController', 'show', array('project_id' => $project['id'], 'sorting' => 'id', 'plugin' => 'Gantt')) ?>
            </li>
            <li <?= $sorting === 'board' ? 'class="active"' : '' ?>>
                <?= $this->url->icon('sort-numeric-asc', t('Sort by position'), 'TaskGanttController', 'show', array('project_id' => $project['id'], 'sorting' => 'board', 'plugin' => 'Gantt')) ?>
            </li>
            <li <?= $sorting === 'name' ? 'class="active"' : '' ?>>
                <?= $this->url->icon('sort-numeric-asc', t('Sort by name'), 'TaskGanttController', 'show', array('project_id' => $project['id'], 'sorting' => 'name', 'plugin' => 'Gantt')) ?>
            </li>
            <li <?= $sorting === 'date' ? 'class="active"' : '' ?>>
                <?= $this->url->icon('sort-amount-asc', t('Sort by date'), 'TaskGanttController', 'show', array('project_id' => $project['id'], 'sorting' => 'date', 'plugin' => 'Gantt')) ?>
            </li>
            <li>
                <?= $this->modal->large('plus', t('Add task'), 'TaskCreationController', 'show', array('project_id' => $project['id'])) ?>
            </li>
            <li>
            <span  >
                <i class="fa fa-th"></i>
                <i class="fa fa-arrows-h" >
                <input type="range" id="zoomFactorW" name="zoomFactorW"  min="850" max="1050"/>
                </i>
                <i class="fa fa-arrows-v" >
                <input type="range" id="zoomFactorH" name="zoomFactorH"  min="750" max="1250" />
                </i>
                <i class="fa fa-th-large"></i>
            </span>  
            </li>
        </ul>        
    </div>

    <?php if (! empty($tasks)): ?>
        <div
            id="gantt-chart"
            data-records='<?= json_encode($tasks, JSON_HEX_APOS) ?>'
            data-save-url="<?= $this->url->href('TaskGanttController', 'save', array('project_id' => $project['id'], 'plugin' => 'Gantt')) ?>"
            data-label-start-date="<?= t('Start date:') ?>"
            data-label-end-date="<?= t('Due date:') ?>"
            data-label-assignee="<?= t('Assignee:') ?>"
            data-label-not-defined="<?= t('There is no start date or due date for this task.') ?>"
        ></div>
        <p class="alert alert-info">
        <span>
            <?= t('Moving or resizing a task will change the start and due date of the task.') ?>
        </span>
           
        </p>
        
    <?php else: ?>
        <p class="alert"><?= t('There is no task in your project.') ?></p>
    <?php endif ?>
</section>
