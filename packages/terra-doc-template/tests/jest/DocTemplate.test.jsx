import React from 'react';

import DocTemplate from '../../src/DocTemplate';
import TestComponentExample from '../../src/terra-dev-site/test/doc-template/common/TestComponentExample';

// These cannot be properly imported with jest so substitute this value in instead
const readme = 'test-file-stub';
const exampleSrc = 'test-file-stub';
const testComponentSrc = 'test-file-stub';

const exampleElement = <TestComponentExample />;

describe('DocTemplate', () => {
  // Snapshot Tests
  it('should render a default component with nothing', () => {
    const wrapper = shallow(<DocTemplate />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show the version', () => {
    const wrapper = shallow(<DocTemplate packageName="terra-doc-template" />);
    expect(wrapper).toMatchSnapshot();
  });


  it('should show the readme', () => {
    const wrapper = shallow(<DocTemplate readme={readme} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show the version and readme', () => {
    const wrapper = shallow(<DocTemplate packageName="terra-doc-template" readme={readme} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show one example', () => {
    const wrapper = shallow(<DocTemplate examples={[{
 title: 'Test Example 1', description: 'Describing the test', example: exampleElement, source: exampleSrc,
}]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show multiple examples', () => {
    const wrapper = shallow(<DocTemplate
      examples={[{
 title: 'Test Example 1', description: 'Describing the test', example: exampleElement, source: exampleSrc,
},
      {
 title: 'Test Example 2', description: 'Describing the test mk. 2', example: exampleElement, source: exampleSrc,
}]}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show one props table', () => {
    const wrapper = shallow(<DocTemplate propsTables={[{ componentSrc: testComponentSrc, componentName: 'Test Component' }]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show multiple props tables', () => {
    const wrapper = shallow(<DocTemplate
      propsTables={[{ componentSrc: testComponentSrc, componentName: 'Test Component' },
      { componentSrc: testComponentSrc, componentName: 'Test Component (Again)' }]}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show the version, readme, source link, examples, and props tables', () => {
    const wrapper = shallow(<DocTemplate
      packageName="terra-doc-template"
      readme={readme}
      srcPath="https://github.com/cerner/terra-core/tree/master/packages/terra-doc-template"
      examples={[{
 title: 'Test Example 1', description: 'Describing the test', example: exampleElement, source: exampleSrc,
},
      {
 title: 'Test Example 2', description: 'Describing the test mk. 2', example: exampleElement, source: exampleSrc,
}]}
      propsTables={[{ componentSrc: testComponentSrc, componentName: 'Test Component' },
      { componentSrc: testComponentSrc, componentName: 'Test Component (Again)' }]}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
