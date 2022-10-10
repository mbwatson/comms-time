const work = {
  /* research groups */
  nrig: {
    name: 'Network Research & Infrastructure',
    color: '#e39862',
    projects: [
      { id: 'aerpaw',                                     name: 'AERPAW' },
      { id: 'atlanticwave-sdx',                           name: 'AtlanticWave-SDX' },
      { id: 'chameleon-cloud',                            name: 'Chameleon Cloud' },
      { id: 'ci-coe-pilot',                               name: 'CI CoE Pilot' },
      { id: 'cici-safe',                                  name: 'CICI Safe' },
      { id: 'distinct',                                   name: 'DISTINCT' },
      { id: 'dynamo',                                     name: 'DyNamo' },
      { id: 'enter',                                      name: 'ENTeR' },
      { id: 'exogeni',                                    name: 'ExoGENI' },
      { id: 'fabric',                                     name: 'FABRIC' },
      { id: 'impact',                                     name: 'ImPACT' },
      { id: 'inca',                                       name: 'INCA' },
      { id: 'iris',                                       name: 'IRIS' },
      { id: 'lassaress',                                  name: 'LASSaRESS' },
      { id: 'panorama-360',                               name: 'Panorama 360' },
      { id: 'percept',                                    name: 'PERCEPT' },
      { id: 'safe-superfacilities',                       name: 'SAFE Superfacilities' },
    ],
  },
  eds: {
    name: 'Earth Data Science',
    color: '#9edf7a',
    projects: [
      { id: 'coastal-hazards-and-risks',                  name: 'Coastal Hazards and Risks' },
      { id: 'coupling-flood-models',                      name: 'Coupling Flood Models' },
      { id: 'galapagos-science-center',                   name: 'Galapagos Science Center' },
      { id: 'hydroshare',                                 name: 'Hydroshare' },
      { id: 'nc-pfas',                                    name: 'NC PFAS Testing Network Data Science Team' },
    ],
  },
  analytics: {
    name: 'Data Science & Analytics',
    color: '#1a73e8',
    projects: [
      { id: 'ccdh',                                       name: 'Center for Cancer Data Harmonization' },
      { id: 'chemotext2',                                 name: 'Chemotext2' },
      { id: 'ctmd',                                       name: 'Clinical Trial Management Dashboard' },
      { id: 'data-translator',                            name: 'Data Translator' },
      { id: 'dot-safety-assessment-project',              name: 'DOT Safety Assessment Project' },
      { id: 'robokop',                                    name: 'ROBOKOP' },
      { id: 'family-planning-national-training-center',   name: 'Family Planning National Training Center' },
      { id: 'man-to-molecule-to-man',                     name: 'Man to Molecule to Man' },
      { id: 'nb',                                         name: 'NeuroBridge' },
      { id: 'obesity-hub',                                name: 'Obesity Hub' },
      { id: 'pds',                                        name: 'PDS' },
      { id: 'scate',                                      name: 'SCATE' },
      { id: 'si4nago',                                    name: 'Semantic Infrastructure for Noctua and Gene Ontology' },
    ],
  },
  health: {
    name: 'Health Informatics',
    color: '#1bd6d9',
    projects: [
      { id: 'nc-tracs',                                   name: 'NC TraCS' },
      { id: 'platform-for-analyzing-whole-brain-images',  name: 'Platform for Analyzing Whole Brain Images' },
      { id: 'rapid',                                      name: 'RAPID' },
      { id: 'sc2i',                                       name: 'Surgical Critical Care Initiative (SC2i)' },
    ],
  },
  software: {
    name: 'Software Architecture',
    color: '#666',
    projects: [
      { id: 'biodata-catalyst',                           name: 'BioData Catalyst' },
      { id: 'brain-i',                                    name: 'BRAIN-I' },
      { id: 'evry-scope',                                 name: 'EvryScope' },
      { id: 'helx',                                       name: 'HeLx' },
      { id: 'scidas',                                     name: 'SciDAS' },
    ],
  },
  /* collaborations */
  bdc: {
    name: 'BioData Catalyst',
    color: '#b33243',
    projects: [
      { id: 'bdc3',                                       name: 'BDC3' },
      { id: 'bdc3-fellows',                               name: 'BDC3: Fellows Program' },
      { id: 'bdc3-cici',                                  name: 'BDC3: CICI Program' },
    ],
  },
  heal: {
    id: 'heal',
    name: 'HEAL Data Stewards',
    color: '#441d4f',
    projects: [
      { id: 'heal',                                       name: 'HEAL' },
    ],
  },
  ncds: {
    id: 'ncds',
    name: 'NCDS',
    color: '#de2a35',
    projects: [
      { id: 'data-matters',                               name: 'Data Matters' },
      { id: 'ncds',                                       name: 'NCDS' },
    ],
  },
  irods: {
    id: 'irods-consortium',
    name: 'iRODS Consortium',
    color: '#0E8F8B',
    projects: [
      { id: 'irods',                                      name: 'iRODS' },
    ],
  },
  radx: {
    id: 'radx',
    name: 'RADx DataHub',
    color: '#387982',
    projects: [
      { id: 'radx',                                       name: 'RADx' },
    ],
  },
  /* operations */
  comms: {
    name: 'Comms',
    color: 'coral',
    projects: [
      { id: 'comms-admin',                                name: 'Administrative' },
    ],
  },
  /* general */
  general: {
    name: 'General',
    color: '#999',
    projects: [
      { id: 'meeting',                                    name: 'Meeting' },
      { id: 'misc',                                       name: 'Miscellaneous' },
    ],
  },
}

const allProjects = Object.keys(work)
  .reduce((projects, groupKey) => {
    const {
      name: groupName,
      projects: groupProjects,
    } = work[groupKey]
    return [
      ...projects,
      ...groupProjects.map(({ id, name }) => ({
        id: id,
        name: `${ name }`,
        group: groupName,
        color: work[groupKey].color,
      }))
    ]
  }, []).sort((p, q) => p.name.toLowerCase() < q.name.toLowerCase() ? -1 : 1)

module.exports = {
  projects: allProjects,
}
