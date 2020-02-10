import * as vis from '../visualizer'
import * as le from 'lits-extras'
import 'lits-extras/styles/dependency-diag.less'

vis.registerVisualizer("dependency-diag", le.createDependencyDiagram)
