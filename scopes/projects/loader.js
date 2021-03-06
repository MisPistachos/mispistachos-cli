#!/usr/bin/env node


var scope = require(__base+"utilities/scope.js")
var _description = 'Manage projects in Google Cloud'
var _alias = "p"
var _name = "projects"


var _options = [
  new scope.Option("z", "zone", "GCP project zone")
] 

module.exports = {
  description: _description,
  alias: _alias,
  name: _name,
  options: _options
}