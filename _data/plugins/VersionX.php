id: 6
name: VersionX
description: 'The plugin that enables VersionX of tracking your content.'
properties: null

-----

$corePath = $modx->getOption('versionx.core_path',null,$modx->getOption('core_path').'components/versionx/');
require_once $corePath.'model/versionx.class.php';
$modx->versionx = new VersionX($modx);

include $corePath . 'elements/plugins/versionx.plugin.php';
return;