import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Pagination from '../index';

storiesOf('Button', module)
  .add('default view', () => (
    <Pagination
      totalResults={100}
      resultsPerPage={10}
      actualPage={1}
      onChangePage= {
        (options) => {
          action(`New page => ${options.page}`);
        }
      }
    />
  ));
