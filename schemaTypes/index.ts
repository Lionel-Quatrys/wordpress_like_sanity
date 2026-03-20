import { authorType } from "./documents/authorType";
import { categoryType } from "./documents/categoryType";
import { navigationType } from "./documents/navigationType";
import { pageType } from "./documents/pageType";
import { postType } from "./documents/postType";
import { siteSettingsType } from "./documents/siteSettingsType";
import { aiMetadataType } from "./objects/aiMetadata";
import { imageWithAltType } from "./objects/imageWithAlt";
import { linkType } from "./objects/link";
import { richTextType } from "./objects/richText";
import { seoType } from "./objects/seo";
import { slugType } from "./objects/slug";
import { ctaSectionType } from "./objects/sections/cta";
import { faqSectionType } from "./objects/sections/faq";
import { gallerySectionType } from "./objects/sections/gallery";
import { heroSectionType } from "./objects/sections/hero";
import { imageSectionType } from "./objects/sections/imageSection";
import { textSectionType } from "./objects/sections/textSection";

export const schemaTypes = [
  pageType,
  postType,
  categoryType,
  authorType,
  siteSettingsType,
  navigationType,
  aiMetadataType,
  seoType,
  slugType,
  imageWithAltType,
  linkType,
  richTextType,
  heroSectionType,
  textSectionType,
  imageSectionType,
  gallerySectionType,
  ctaSectionType,
  faqSectionType,
];
