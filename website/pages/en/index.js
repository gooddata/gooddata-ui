/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const hljs = require('highlight.js');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className={this.props.className || 'button'} href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const ResponsiveImage = props => (
  <div
    className={'responsiveImage ' + props.className}
    tite={props.alt}
    style={{backgroundImage: 'url(' + props.src + ')'}}
  />
);

const SplashContainer = props => (
  <section className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </section>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h1 className="projectTitle">
    <small>{siteConfig.tagline}</small>
    {siteConfig.title}
  </h1>
);

const ProjectDescription = props => (
  <p className="projectDescription">A React-based JavaScript library for building smart <br className="noMobile" />business applications powered by GoodData</p>
)

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <ProjectDescription />
          <PromoSection>
            <Button href={docUrl('getting_started.html')}>Get Started</Button>
            <Button href="https://www.gooddata.com" className="button-link">About GoodData</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const BackgroundBlock = props => (
  <div className={'backgroundBlock-' + props.background}>
    {props.children}
  </div>
)

const FeaturesBlock = props => (
  <div className={'wrapper featuresBlock featuresBlockText-'+ props.textPosition}>
    <div className="featuresText">
      <h2 className="featuresTitle">{props.title}</h2>
      {props.content && <p className="featuresContent">{props.content}</p>}
      {props.linkTitle && <a href={props.linkUrl} className="featuresLink">{props.linkTitle}</a>}
      {props.children}
    </div>
    <div className="featuresExample">
      {props.example}
    </div>
  </div>
);

const FeaturesBlockGallery = props => {
  const gallery = props.children.map((item) => (
    <li className="featuresBlockGalleryItem">
      <h4 className="featuresBlockGalleryTitle">{item.title}</h4>
      <ResponsiveImage
        className="featuresBlockGalleryImage"
        alt={item.title}
        src={item.image}
      />
    </li>
  ));

  return <ul className="featuresBlockGallery">{gallery}</ul>
}

const VisualizationsSection = (props) => {
  const imgPath = '/static/img/vis-icons/';
  const visualizations = ['Table', 'Pie', 'Line', 'Column', 'Headline', 'Scatter', 'Bubble', 'Bar', 'Treemap', 'Column-line', 'Funnel', 'Dual Line'];
  const visualizationsList = visualizations.map((visualization) => {
    const visClass = visualization.replace(/\s/, '-').toLowerCase();

    return (
      <li className={'visualization ' + visClass}>
        <img src={imgPath + visClass} className="visualizationImage" alt={visualization} />
        <span className="visualizationTitle">{visualization}</span>
      </li>
    );
  });
  return (
    <div className="visualizationsSection">
      <ul className="visualizationsList">{visualizationsList}</ul>
    </div>
  );
};

const CodeExample1 =
`<LineChart
  projectId='<project-id>'
  measures={measures}
  trendBy={attribute}
  config={
    colors: ['#14b2e2', '#02C18E']
  }
/>`;

const CodeExample2 =
`<Execute afm={<afm>} projectId={<project-id>}
onLoadingChanged={function} onError={function}>
{
    // your visualization code
}
</Execute>`;

const InstallationExample1 =
`// optional See how to install yarn, or use npm.
$ yarn global add create-react-app
$ create-react-app my-first-sba


// installation
$ cd my-first-sba
$ yarn add @gooddata/react-components`;

const InstallationExample2 = (
  <ol>
    <li>
      Open your <strong>GoodData project</strong> in the browser.
      <img src="./img/homepage/installation_2.png" />
    </li>
    <li>
      Search for <strong>/projects/</strong> in the address bar.
      <pre className="exampleCode">
        <code className="hljs highlighting">
          <span className="hljs-literal">https://</span>
          …gooddata.com/…/projects/
          <span className="hljs-selector-id">ProjectID</span>
          |…
        </code>
      </pre>
    </li>
    <li>
      Save the <span className="hljs-selector-id">Project ID</span> for later.
    </li>
  </ol>
);

const InstallationExample3 =
`import { LineChart } from '@gooddata/react-components';

<LineChart
    projectId="<project-id>"
    measures={measures}
    trendBy={attribute}
    config={
       colors: ['#14b2e2']
    }
/>`;

const ExampleCode = props => {
  return (
    <pre className="exampleCode">
      <code
        className={'hljs highlighting ' + props.lang}
        dangerouslySetInnerHTML={{__html: hljs.highlight(props.lang, props.code).value}} />
    </pre>
  );
};

const ExampleImage = props => (
  <div className="exampleImage">
    <img src={props.src} alt={props.alt} className="exampleImageImage" />
  </div>
)

const Features = props => (
  <section className="features">
    <BackgroundBlock background="gray">
      <FeaturesBlock
        title="Use analytics visualizations as simple React components"
        content="Build your application from ready-made and custom React components. Customize visualizations in just a few lines of code. No iframes involved."
        example={[
          <ExampleCode lang="html" code={CodeExample1}></ExampleCode>,
          <ExampleImage src="./img/homepage/example_1.png" alt="Example 1" />
        ]}
        linkTitle="View all visual components"
        linkUrl=""
        textPosition="left"
        background="gray"
      />
      {/*<VisualizationsSection />*/}
    </BackgroundBlock>

    <BackgroundBlock background="white">
      <FeaturesBlock
        title="Create custom visualizations"
        content="Use the GoodData React data provider component to wrap any visualization, from libraries like D3.js, Highcharts or Chart.js, to completely custom code."
        example={[
          <ExampleCode lang="html" code={CodeExample2}></ExampleCode>,
          <ExampleImage src="./img/homepage/example_2.png" alt="Example 2" />
        ]}
        linkTitle="View custom visualization tutorial"
        linkUrl=""
        textPosition="right"
        background="white"
      >
        <ResponsiveImage src="./img/homepage/d3_logo.png" alt="D3.js" className="charting-lib-logo d3-logo" />
        <ResponsiveImage src="./img/homepage/highcharts_logo.png" alt="Highcharts" className="charting-lib-logo highcharts-logo" />
        <ResponsiveImage src="./img/homepage/chartjs_logo.png" alt="Chart.js" className="charting-lib-logo chartjs-logo" />
      </FeaturesBlock>
    </BackgroundBlock>

    <BackgroundBlock background="gray">
      <FeaturesBlock
        title="Power of the GoodData platform"
        content="Ready-made components for ad hoc data analysis, machine learning recommendations and much more…"
        example={<FeaturesBlockGallery>
          {[{
            title: 'Discover',
            image: './img/homepage/discover.png'
          },{
            title: 'Publish',
            image: './img/homepage/publish.png'
          },{
            title: 'Embed',
            image: './img/homepage/embed.png'
          }]}
        </FeaturesBlockGallery>}
        linkTitle="View the Platform demo"
        linkUrl=""
        textPosition="center"
        background="gray"
      />
    </BackgroundBlock>
  </section>
);

const FeatureCalloutBlock = props => (
  <div className="productShowcaseBlock">
    <label>
      <input
        type="radio"
        name="productShowcaseSwitch"
        className="productShowcaseSwitch"
        checked={props.checked}
      />
      <div className="productShowcaseTitle">
        <h4>{props.title}</h4>
      </div>
      <div className="productShowcaseExample">{props.example}</div>
    </label>
  </div>
);

const FeatureCallout = props => (
  <section className="productShowcaseSection">
    <h2>Start Right Now</h2>
    <div className="productShowcase wrapper">
      <div className="productShowcaseInner">
        <FeatureCalloutBlock
          title="Install GoodData.UI"
          example={<ExampleCode lang="shell" code={InstallationExample1}></ExampleCode>}
          checked="true"
        />
        <FeatureCalloutBlock
          title="Get your project ID"
          example={InstallationExample2}
        />
        <FeatureCalloutBlock
          title="Add a visual component"
          example={[
            <ExampleCode lang="html" code={InstallationExample3}></ExampleCode>,
            <p className="codeNote">See <a href="#">how to get identifiers from the GoodData platform</a>.</p>
          ]}
        />
      </div>
    </div>
    <a href="#" className="productShowcaseLink">Continue creating your first visualization</a>
  </section>
);

const GetStarted = props => (
  <section className="getStartedSection">
    <h2>See the GoodData.UI library</h2>
    <Button href={docUrl('getting_started.html')}>Get Started</Button>
  </section>
);

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="homeContainer">
          <Features />
          <FeatureCallout />
          <GetStarted />
        </div>
      </div>
    );
  }
}

module.exports = Index;
