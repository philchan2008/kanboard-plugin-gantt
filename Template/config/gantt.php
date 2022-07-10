<div class="page-header">
    <h2><?= t('Gantt settings') ?></h2>
</div>
<form method="post" action="<?= $this->url->href('ConfigController', 'save', array('plugin' => 'Gantt')) ?>" autocomplete="off">

    <?= $this->form->csrf() ?>

    <fieldset>
        <legend><?= t('Gantt chart') ?></legend>
        <?= $this->form->radios('gantt_task_sort', array(
                'id' => t('Sort tasks by ID#'),
                'board' => t('Sort tasks by position'),
                'name' => t('Sort tasks by name'),
                'date' => t('Sort tasks by date'),
            ),
            $values
        ) ?>
    </fieldset>

    <div class="form-actions">
        <button type="submit" class="btn btn-blue"><?= t('Save') ?></button>
    </div>
</form>
