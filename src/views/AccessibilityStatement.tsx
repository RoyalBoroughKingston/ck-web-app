import React from 'react';
import { Link } from 'react-router-dom';
import CMSPage from '../components/CMSPageLayout';


const AccessibilityStatement: React.FunctionComponent = () => (
  <CMSPage title="Accessibility statement" breadcrumb="Accessibility statement">
    <p>This accessibility statement applies to content published on <a href="connectedkingston.uk">connectedkingston.uk</a></p>
    <p>This website is run by Kingston council. We want as many people as possible to be able to use this website. For example, that means you should be able to:</p>

    <p>It is designed to be used by as many people as possible. The text should be clear and simple to understand. You should be able to:</p>

    <ul>
      <li>zoom in up to 300% without problems</li>  
      <li>navigate most of the website using just a keyboard</li>
      <li>navigate most of the website using speech recognition software</li>
      <li>use most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)</li>
    </ul>

    <p>We've also made the website text as simple as possible to understand.</p>

    <p>For more information <a href="https://mcmw.abilitynet.org.uk/" rel="noreferrer" target="_blank">AbilityNet</a> has advice on making your device easier to use if you have a disability.</p>

    <h2>How accessible this website is</h2>

    <p>Parts of this website are not fully accessible. For example:</p>

    <ul>
      <li>some pages and document attachments are not written in plain English</li>
      <li>some tables do not have row headings</li>
      <li>some documents have poor colour contrast</li>
      <li>some heading elements are not consistent</li>
      <li>some images do not have image descriptions</li>
      <li>some buttons are not correctly identified</li>
      <li>some error messages are not clearly associated with form controls</li>
      <li>many documents are in PDF format and are not accessible</li>  
    </ul>

    <h2>Feedback and contact information</h2>

    <p>If you find any problems not listed on this page or think we're not meeting accessibility requirements our contact information is available on our <Link to="/contact">contact us</Link> page.</p>

    <p>If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille our contact information is available on our <Link to="/contact">contact us</Link> page.</p>

    <p>We'll consider your request and get back to you in 10 days.</p>
    <p>If you cannot view the map on our <Link to="/contact">contact us</Link> page, call or <a href="mailto:info@connectedkingston.uk">email us</a> for directions.</p>

    <h2>Enforcement procedure</h2>
    <p>The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the 'accessibility regulations'). If you're not happy with how we respond to your complaint, contact the Equality Advisory and Support Service (EASS).</p>

    <h2>Technical information about this website's accessibility</h2>

    <p>Kingston council is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.</p>

    <h3>Compliance status</h3>

    <p>This website is partially compliant with the Web Content Accessibility Guidelines version 2.1 AA standard, due to the non-compliances listed below.</p>

    <h3>Non-accessible content</h3>

    <p>The content listed below is non-accessible for the following reasons.</p>

    <h4>Links</h4>

    <p>Some links are not meaningful when read out of context. The fails WCAG 2.1 success criterion 2.4.4.</p>

    <h4>Image alt text</h4>

    <p>Some images are missing alt text. The fails WCAG 2.1 success criterion 1.1.1.</p>

    <p>Some images contain text that is not in Alt text. This fails WCAG success criterion 1.4.5.</p>

    <h4>Info and relationships</h4>

    <p>Some headings containing p elements are used in headers. This fails WCAG success criterion 1.3.1.</p>

    <h4>Parsing</h4>

    <p>Some ID elements are not unique. This fails WCAG success criterion 4.1.1.</p>

    <h4>Labels or instructions</h4>

    <p>Some labels or instructions are not provided when content requires user input. This fails success criterion 3.3.2.</p>

    <h4>Bypass blocks</h4>

    <p>Missing skip to content link and some links with a related purpose are not marked. This fails success criterion 2.4.1.</p>

    <h4>Contrast (minimum)</h4>

    <p>Some pages contain content and links that do not meet the contrast minimum requirements. This fails success criterion 1.4.3.</p>

    <h4>Headings and labels</h4>

    <p>Some headings are not following the correct order. This fails success criterion 2.4.6.</p>

    <h4>Multiple ways</h4>

    <p>Site does not contain a sitemap. This fails success criterion 2.4.5.</p>

    <h4>Reesize text</h4>

    <p>Some content contains i (italic) elements. This fails success criterion 1.4.4</p>

    <h4>Reading level</h4>

    <p>Some of the pages contain content that does not reach the required reading level. This fails success criterion 3.1.5</p>

    <h2>Preparation of this accessibility statement</h2>

    <p>This statement was prepared on 02 January 2024. It was last reviewed on 07 February 2024.</p>

    <p>This website was last tested on 28 December 2023. The test was carried out using a third party tool called Monsido.</p>
  </CMSPage>
)

export default AccessibilityStatement;
