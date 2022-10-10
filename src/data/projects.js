import { groups } from './groups'

export const projects = [
  { id: 'aerpaw',                                     name: 'AERPAW',                                                groupId: 'nrig' },
  { id: 'atlanticwave-sdx',                           name: 'AtlanticWave-SDX',                                      groupId: 'nrig' },
  { id: 'chameleon-cloud',                            name: 'Chameleon Cloud',                                       groupId: 'nrig' },
  { id: 'ci-coe-pilot',                               name: 'CI CoE Pilot',                                          groupId: 'nrig' },
  { id: 'cici-safe',                                  name: 'CICI Safe',                                             groupId: 'nrig' },
  { id: 'distinct',                                   name: 'DISTINCT',                                              groupId: 'nrig' },
  { id: 'dynamo',                                     name: 'DyNamo',                                                groupId: 'nrig' },
  { id: 'enter',                                      name: 'ENTeR',                                                 groupId: 'nrig' },
  { id: 'exogeni',                                    name: 'ExoGENI',                                               groupId: 'nrig' },
  { id: 'fabric',                                     name: 'FABRIC',                                                groupId: 'nrig' },
  { id: 'impact',                                     name: 'ImPACT',                                                groupId: 'nrig' },
  { id: 'inca',                                       name: 'INCA',                                                  groupId: 'nrig' },
  { id: 'iris',                                       name: 'IRIS',                                                  groupId: 'nrig' },
  { id: 'lassaress',                                  name: 'LASSaRESS',                                             groupId: 'nrig' },
  { id: 'panorama-360',                               name: 'Panorama 360',                                          groupId: 'nrig' },
  { id: 'percept',                                    name: 'PERCEPT',                                               groupId: 'nrig' },
  { id: 'safe-superfacilities',                       name: 'SAFE Superfacilities',                                  groupId: 'nrig' },
  { id: 'coastal-hazards-and-risks',                  name: 'Coastal Hazards and Risks',                             groupId: 'eds' },
  { id: 'coupling-flood-models',                      name: 'Coupling Flood Models',                                 groupId: 'eds' },
  { id: 'galapagos-science-center',                   name: 'Galapagos Science Center',                              groupId: 'eds' },
  { id: 'hydroshare',                                 name: 'Hydroshare',                                            groupId: 'eds' },
  { id: 'nc-pfas',                                    name: 'NC PFAS Testing Network Data Science Team',             groupId: 'eds' },
  { id: 'ccdh',                                       name: 'Center for Cancer Data Harmonization',                  groupId: 'dsa' },
  { id: 'chemotext2',                                 name: 'Chemotext2',                                            groupId: 'dsa' },
  { id: 'ctmd',                                       name: 'Clinical Trial Management Dashboard',                   groupId: 'dsa' },
  { id: 'data-translator',                            name: 'Data Translator',                                       groupId: 'dsa' },
  { id: 'dot-safety-assessment-project',              name: 'DOT Safety Assessment Project',                         groupId: 'dsa' },
  { id: 'robokop',                                    name: 'ROBOKOP',                                               groupId: 'dsa' },
  { id: 'family-planning-national-training-center',   name: 'Family Planning National Training Center',              groupId: 'dsa' },
  { id: 'man-to-molecule-to-man',                     name: 'Man to Molecule to Man',                                groupId: 'dsa' },
  { id: 'nb',                                         name: 'NeuroBridge',                                           groupId: 'dsa' },
  { id: 'obesity-hub',                                name: 'Obesity Hub',                                           groupId: 'dsa' },
  { id: 'pds',                                        name: 'PDS',                                                   groupId: 'dsa' },
  { id: 'scate',                                      name: 'SCATE',                                                 groupId: 'dsa' },
  { id: 'si4nago',                                    name: 'Semantic Infrastructure for Noctua and Gene Ontology',  groupId: 'dsa' },
  { id: 'nc-tracs',                                   name: 'NC TraCS',                                              groupId: 'hi' },
  { id: 'platform-for-analyzing-whole-brain-images',  name: 'Platform for Analyzing Whole Brain Images',             groupId: 'hi' },
  { id: 'rapid',                                      name: 'RAPID',                                                 groupId: 'hi' },
  { id: 'sc2i',                                       name: 'Surgical Critical Care Initiative (SC2i)',              groupId: 'hi' },
  { id: 'biodata-catalyst',                           name: 'BioData Catalyst',                                      groupId: 'sa' },
  { id: 'brain-i',                                    name: 'BRAIN-I',                                               groupId: 'sa' },
  { id: 'evry-scope',                                 name: 'EvryScope',                                             groupId: 'sa' },
  { id: 'helx',                                       name: 'HeLx',                                                  groupId: 'sa' },
  { id: 'scidas',                                     name: 'SciDAS',                                                groupId: 'sa' },
  { id: 'bdc3',                                       name: 'BDC3',                                                  groupId: 'bdc3' },
  { id: 'bdc3-fellows',                               name: 'BDC3: Fellows Program',                                 groupId: 'bdc3' },
  { id: 'bdc3-cici',                                  name: 'BDC3: CICI Program',                                    groupId: 'bdc3' },
].map(project => ({
  ...project,
  group: groups[project.groupId],
}))
