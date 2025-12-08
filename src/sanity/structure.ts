import type { StructureResolver } from 'sanity/structure'


export const structure: StructureResolver = (S) =>
  S.list()
    .title('SD Innovations')
    .items([
      // Top-level Shared section
      S.listItem()
        .title('Shared')
        .child(
          S.list()
            .title('Shared')
            .items([
              S.listItem()
                .title('FAQ')
                .child(
                  S.list()
                    .title('FAQ')
                    .items([
                      S.documentTypeListItem('faqSection').title('Section Config'),
                      S.documentTypeListItem('faq').title('Question & Answer'),
                    ])
                ),
            ])
        ),

      S.listItem()
        .title('Jobs')
        .child(
          S.list()
            .title('Jobs')
            .items([
            ])
        ),

      S.listItem()
        .title('About Page')
        .child(
          S.list()
            .title('About Page')
            .items([
              S.documentTypeListItem('aboutPage').title('About Page'),
            ])
        ),

      S.listItem()
        .title('Org Services')
        .child(
          S.list()
            .title('Org Services')
            .items([
            ])
        ),

      S.listItem()
        .title('Terms And Conditions')
        .child(
          S.list()
            .title('Terms And Conditions')
            .items([
              
            ])
        ),

      S.listItem()
        .title('Works')
        .child(
          S.list()
            .title('Works')
            .items([
              S.documentTypeListItem('homepageValue').title('Benefits'),
              S.listItem()
                .title('Process')
                .child(
                  S.list()
                    .title('Process')
                    .items([
                      S.documentTypeListItem('processSection').title('Section Config'),
                      S.documentTypeListItem('process').title('Process Steps'),
                    ])
                ),
              S.documentTypeListItem('pricing').title('Pricing'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
            ])
        ),

      
      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage')
            .items([
              S.documentTypeListItem('homepageValue').title('Values'),
            ])
        ),

      S.listItem()
        .title('Clients')
        .child(
          S.list()
            .title('Clients')
            .items([
            ])
        ),

      S.listItem()
        .title('Team')
        .child(
          S.list()
            .title('Team')
            .items([
            ])
        ),

      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
            ])
        ),
    ])