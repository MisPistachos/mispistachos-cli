var userUtils = require(__base+'utilities/user.js')
var k8s = require(__base+'utilities/k8s.js')
var cmd = require(__base+'utilities/cmd.js')

var run = function(userContainerFlagValue, userDeploymentFlagValue){
  var containerName = userUtils.getContainer(userContainerFlagValue)
  var deploymentName = userUtils.getDeployment(userDeploymentFlagValue)


  console.log("Searching pod for container '"+containerName+"'")

  var podName = userUtils.getPod(containerName, deploymentName)

  var fullCommand = "kubectl exec -it "+podName+" -c "+containerName+" bash"
  console.log("Executing command:")
  console.log("  " + fullCommand)
  console.log("")
  console.log("")

  var spawn = require('child_process').spawn;
  var child = spawn('kubectl', ['exec', '-it', podName, '-c', containerName, 'bash'], {stdio: [0, 1, 2]});

}

var load= function(program){
  program
  .command('ssh')
  .alias('bash')
  .description('SSH to a specific remote container')
  .action(function(){
    run(program.container, program.deployment)
  })
  .on('--help', function(){
    console.log("    Check 'mp k -h' for global options")
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ mp k ssh                                       # SSH with container "repoName" in the current project');
    console.log('    $ mp k ssh -d deployName                         # SSH with container "repoName", deployment "deployName" in the current project');
    console.log('    $ mp k ssh -c containerName                      # SSH with container "containerName" in the current project');
    console.log('    $ mp k ssh -d deployName -c containerName        # SSH with container "containerName", deployment "deployName" in the current project, container "containerName" in the current project');
    console.log('')
    console.log('    To change the current project, look:')
    console.log('      $ mp p set -h')
    console.log('');
  });
}
module.exports = load
