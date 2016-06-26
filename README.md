# React Pagination Component

Simple pagination component for use with React.

You can view an online example in [http://amadormf.github.io/react-pag/](http://amadormf.github.io/react-pag/)


##Install

`npm install --save react-pag`

##Example

```javascript
  <Pagination
    totalResults={100}
    resultsPerPage={10}
    urlPattern="search"
  />
```

##Props

|Props Name | Type         | Default  | Description              |
|-----------|--------------|:--------:|----------------|
|totalResults  |Number         |          |Number of results for paginate|
|resultsPerPage|Number     |          |Number of results per page|
|actualPage |Number       |           |Force the actual page of pagination|
|maxPagination|Number     |           |Max number of buttons to show |
|onChangePage|Function    |           |Function to call when the page change|
|showBeginingEnd|Bool     |false      |Show buttons to move to the beginning and go to the end|
|showPreviousNext|Bool    |false      |Show previous and next button|
|urlPattern |String       |           |Path to use in href of pagination, you can get more info in [https://github.com/amadormf/pagination-template](https://github.com/amadormf/pagination-template)|
|preventNavigate|Bool     |true       |You can control the navigation over pages with onChangePage, if you prefer you can give the control to navigator setting this parameter to false|
|className   |String     |            |You can use a custom className|
|initialPage |Number     |            |Initial page|
