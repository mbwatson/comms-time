const categories = [
  { id: 'administrative',       name: 'Administrative' },
  { id: 'animation',            name: 'Animation' },
  { id: 'branding',             name: 'Branding' },
  { id: 'collateral',           name: 'Collateral' },
  { id: 'copyediting',          name: 'Copyediting' },
  { id: 'graphic-design',       name: 'Graphic Design' },
  { id: 'editing',              name: 'Editing' },
  { id: 'logo',                 name: 'Logo' },
  { id: 'mailing',              name: 'Mailing' },
  { id: 'maintenance',          name: 'Maintenance' },
  { id: 'meeting',              name: 'Meeting' },
  { id: 'outreach',             name: 'Outreach' },
  { id: 'poster',               name: 'Poster' },
  { id: 'presentation',         name: 'Presentation' },
  { id: 'proposal',             name: 'Proposal' },
  { id: 'reports',              name: 'Reports' },
  { id: 'social media',         name: 'Social Media' },
  { id: 'strategy',             name: 'Strategy' },
  { id: 'videography',          name: 'Videography' },
  { id: 'web-design',           name: 'Web Design' },
  { id: 'web-dev',              name: 'Web Development' },
  { id: 'writing',              name: 'Writing' },
].sort((c, d) => c.name.toLowerCase() < d.name.toLowerCase() ? -1 : 1)

module.exports = { categories }

