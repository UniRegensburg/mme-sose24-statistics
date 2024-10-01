# Tutorial on Entities

## `DataEntity`

The class `DataEntity` stores a table of questionnaire data and user information. A `DataEntity` contains information of its questionnaire type, data and columns. The following is an example of a `DataEntity` of rawTLX questionnaire with 2 rows of data.

```javascript
DataEntity {
  type: {
    name: 'rawTLX',
    numOfQuestions: 6,
    minValue: 0,
    maxValue: 20,
    scoreCalculator: [Function: scoreCalculator],
    scoreInterpretor: [Function: scoreInterpretor]
  },
  data:
    [
  	  { Q1: 11, Q2: 18, Q3: 18, Q4: 17, Q5: 19, Q6: 9, id: 1, age: 33, 'T:Q1+Q2': 29 },
  	  { Q1: 13, Q2: 2, Q3: 10, Q4: 14, Q5: 17, Q6: 18, id: 2, age: 21, 'T:Q1+Q2': 15 }
    ],
  columns: {
    userInfo: [ 'id', 'age' ],
    questions: [
      'Q1', 'Q2', 'Q3',
      'Q4', 'Q5', 'Q6',
      'Q7', 'Q8'
    ],
    transform: [ 'T:Q1+Q2' ]
  }
}
```

- `type`: The type of questionnaire. 
- `data`: The raw data, represented by an array of objects. When performing data manipulation on the data, **do not** access the raw data like `dataEntity.data[row]["col"]`, **you are required to use the appropriate member functions instead**.
- `columns`: Stores information about columns.

### Constructor

The constructor of `DataEntity` takes in questionnaire type and data, both are optional. The constructor automatically detect questionnaire columns and user info columns.

```javascript
const dataEntity = new DataEntity(
                       QUESTIONNAIRE_TYPE.NONE,
                       [
                         { Q1: 5, Q2: 5, Q3: 5, id: 1, 'T:Q1+Q3': 10 },
                         { Q1: 4, Q2: 3, Q3: 5, id: 2, 'T:Q1+Q3': 7 },
                       ]
                   )
console.log(dataEntity)
// Result:
//
// DataEntity {
//	type: {
//    name: 'NONE',
//    numOfQuestions: 9007199254740991,
//    minValue: -9007199254740991,
//    maxValue: 9007199254740991,
//    scoreCalculator: [Function: scoreCalculator],
//    scoreInterpretor: [Function: scoreInterpretor]
//  },
//  data:
//	[
//	  { Q1: 5, Q2: 5, Q3: 5, id: 1 },
//    { Q1: 4, Q2: 3, Q3: 5, id: 2 },
//	],
//  columns: {
//    userInfo: [ 'id' ],
//    questions: [ 'Q1', 'Q2', 'Q3' ],
//	  transform: [ 'T:Q1+Q3' ]
//  }
// }
	
```

### Column operations

| Function                          | Description                                                  | Notes                                                  |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| addQuestions(numOfQuestions=1)    | Add given number of new questions to the questionnaire.      | Only NONE-type data allows adding new questions.       |
| deleteQuestions(numOfQuestions=1) | Delete given number of new questions to the questionnaire.   | Only NONE-type data allows setting number of questions |
| addUserInfoColumns(columns)       | Given a string or an array of strings, add new strings among them as user info columns. | Existing columns will not be added again.              |
| addTransformColumns(columns)      | Given a string or an array of strings, create transform columns with those name and fill those columns with the transformed data. | Do not include `'T:` in the input.                     |
| deleteColumns(columns)            | Given a string or an array of strings, delete columns with those names. | Only works for `userInfo` and `transform` columns.     |

### Row operations

| Function                     | Description                                    |
| ---------------------------- | ---------------------------------------------- |
| addEmptyRows(numberOfRows=1) | Append given number of empty rows to the data. |
| insertEmptyRow(index)        | Insert 1 empty row at the given index.         |

### Data manipulation

| Function                       | Description                                       | Notes                                             |
| ------------------------------ | ------------------------------------------------- | ------------------------------------------------- |
| setValue(rowNr, column, value) | Set value at the given and row number and column. | Data in transform columns cannot be manually set. |
| setType(type)                  | Set questionnaire type.                           |                                                   |

### Getters

| Function              | Description                                       |
| --------------------- | ------------------------------------------------- |
| get size()            | Get number of rows of data.                       |
| get numOfQuestions()  | Get number of questions.                          |
| get allColumns()      | Get a list of all columns.                        |
| get userInfoColumns() | Get a list of user info columns.                  |
| get questionColumns() | Get a list of question columns.                   |
| getType()             | Get a string of questionnaire type name.          |
| row(rowNumber)        | Get a single row of data.                         |
| col(columnName)       | Get data from a column as an array.               |
| loc(rowNr, column)    | Get the value at the given row number and column. |

### Example

Using the same `dataEntity` we created earlier:

```javascript
console.log(dataEntity.getType())
// Result: NONE

dataEntity.addQuestions()
console.log(dataEntity.questionColumns)
// Result: [ 'Q1', 'Q2', 'Q3', 'Q4' ]

dataEntity.addUserInfoColumns(["id", "age"])
dataEntity.addUserInfoColumns("gender")
console.log(dataEntity.allColumns)
// Result" [ 'id', 'age', 'gender', 'Q1', 'Q2', 'Q3', 'Q4' ]

dataEntity.addEmptyRows(2)
dataEntity.setValue(2, "Q1", 1000)
console.log(dataEntity.loc(2, "Q1"))
// Result: 1000
console.log(dataEntity)
// Result:
//
// DataEntity {
//	type: {
//    name: 'NONE',
//    numOfQuestions: 9007199254740991,
//    minValue: -9007199254740991,
//    maxValue: 9007199254740991,
//    scoreCalculator: [Function: scoreCalculator],
//    scoreInterpretor: [Function: scoreInterpretor]
//  },
//  data:
//	[
//	  { Q1: 5, Q2: 5, Q3: 5, Q4: null, id: 1, age: null, gender: null },
//	  { Q1: null, Q2: null, Q3: null, Q4: null, id: null, age: null, gender: null },
//	  { Q1: 1000, Q2: null, Q3: null, Q4: null, id: null, age: null, gender: null },
//	],
//  columns: {
//    userInfo: [ 'id', 'age', 'gender' ],
//    questions: [ 'Q1', 'Q2', 'Q3', 'Q4' ],
//    transform: []
//  }
// }
```

## `DiagramEntity`

`DiagramEntity` is a data structure to store all information needed to plot a single diagram. It contains a diagram type, a reference to its data source (a `DataEntity`), and options for plotting.

This class is relatively easy to understand. You can refer to the source code in `src\entities\DiagramEntity.js` for more information.

## `WorkspaceEntity`

The sole purpose of `WorkspaceEntity` is to store current `dataEntity` and `diagramEntity`. 
