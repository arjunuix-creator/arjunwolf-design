import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:              'https://arjuncr.design',
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         1,
    },
    {
      url:              'https://arjuncr.design/work/tu-cibil',
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.9,
    },
    {
      url:              'https://arjuncr.design/work/rmt-holotrack',
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.8,
    },
    {
      url:              'https://arjuncr.design/work/ph-aware',
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.8,
    },
    {
      url:              'https://arjuncr.design/work/finova',
      lastModified:     new Date(),
      changeFrequency:  'monthly',
      priority:         0.7,
    },
  ]
}
