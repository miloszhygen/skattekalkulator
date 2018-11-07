// Import dependencies
import React from 'react';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

// Import components
import Skatt from './Skatt';

describe('Skatt page', () => {
  const skatt = shallow(
    <Skatt/>
  );
  it('renders properly', () => {
    expect(skatt).toMatchSnapshot();
  });
});
