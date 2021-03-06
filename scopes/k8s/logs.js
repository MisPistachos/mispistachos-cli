

var userUtils = require(__base+'utilities/user.js')
var k8s = require(__base+'utilities/k8s.js')
var cmd = require(__base+'utilities/cmd.js')

var run = function(userContainerFlagValue, userDeploymentFlagValue, userNamespaceFlagValue, linesToShow){
  var containerName = userUtils.getContainer(userContainerFlagValue)
  var deploymentName = userUtils.getDeployment(userDeploymentFlagValue)
  var namespaceName = userUtils.getNamespace(userNamespaceFlagValue)

  console.log("Searching pod for container '"+containerName+"'")

  var podName = userUtils.getPod(containerName, deploymentName, namespaceName)
  var lastNLines = linesToShow || 20
  var fullCommand = "kubectl logs --tail " + lastNLines + " -n " + namespaceName + " -f "+ podName
  // var fullCommand = "kubectl exec -it "+podName+"-n "+namespaceName+" -c "+containerName+" -- tail -f log/production.log"
  console.log("Executing command:")
  console.log("  " + fullCommand)
  console.log("")
  console.log("")

  var params = ['logs', '--tail', lastNLines,'-n', namespaceName, '-f', podName]
  cmd.execRemote('kubectl', params)
}

var load= function(program){
  program
  .command('logs [PARAMS...]')
  .option("-l, --lines [lines]", "Lines number to show")
  .description('Check logs for container')
  .action(function(params, command){
    run(program.container, program.deployment, program.namespace, command.lines)
  })
  .on('--help', function(){
    console.log("    Check 'mp k -h' for global options")
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ mp k logs                                       # Logs for container "repoName" in the current project');
    console.log('    $ mp k logs -d deployName                         # Logs for container "repoName", deployment "deployName" in the current project');
    console.log('    $ mp k logs -c containerName                      # Logs for container "containerName" in the current project');
    console.log('    $ mp k logs -d deployName -c containerName        # Logs for container "containerName", deployment "deployName" in the current project');
    console.log('')
    console.log('    To change the current project, look:')
    console.log('      $ mp p set -h')
    console.log('');
  });
}
module.exports = load
