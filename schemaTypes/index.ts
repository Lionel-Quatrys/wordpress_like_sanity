import { authorType } from "./documents/authorType";
import { blogPageType } from "./documents/blogPageType";
import { moduleSettingsType } from "./documents/moduleSettingsType";
import { categoryType } from "./documents/categoryType";
import { footerType } from "./documents/footerType";
import { headerType } from "./documents/headerType";
import { homepageType } from "./documents/homepageType";
import { navigationType } from "./documents/navigationType";
import { notFoundType } from "./documents/notFoundType";
import { pageType } from "./documents/pageType";
import { postType } from "./documents/postType";
import { siteSettingsType } from "./documents/siteSettingsType";
import { testimonialType } from "./documents/testimonialType";
import { themeSettingsType } from "./documents/themeSettingsType";
import { aiMetadataType } from "./objects/aiMetadata";
import { imageWithAltType } from "./objects/imageWithAlt";
import { linkType } from "./objects/link";
import { richTextType } from "./objects/richText";
import { seoType } from "./objects/seo";
import { slugType } from "./objects/slug";
import { contactSectionType } from "./objects/sections/contactSection";
import { ctaSectionType } from "./objects/sections/cta";
import { faqSectionType } from "./objects/sections/faq";
import { gallerySectionType } from "./objects/sections/gallery";
import { heroSectionType } from "./objects/sections/hero";
import { imageSectionType } from "./objects/sections/imageSection";
import { pricingSectionType } from "./objects/sections/pricingSection";
import { teamSectionType } from "./objects/sections/teamSection";
import { testimonialsSectionType } from "./objects/sections/testimonialsSection";
import { textSectionType } from "./objects/sections/textSection";
import { videoSectionType } from "./objects/sections/videoSection";

export const schemaTypes = [
  // Documents
  moduleSettingsType,
  homepageType,
  blogPageType,
  pageType,
  postType,
  categoryType,
  authorType,
  testimonialType,
  siteSettingsType,
  themeSettingsType,
  headerType,
  footerType,
  navigationType,
  notFoundType,
  // Objets
  aiMetadataType,
  seoType,
  slugType,
  imageWithAltType,
  linkType,
  richTextType,
  // Sections
  heroSectionType,
  textSectionType,
  imageSectionType,
  videoSectionType,
  gallerySectionType,
  ctaSectionType,
  faqSectionType,
  pricingSectionType,
  teamSectionType,
  contactSectionType,
  testimonialsSectionType,
];
