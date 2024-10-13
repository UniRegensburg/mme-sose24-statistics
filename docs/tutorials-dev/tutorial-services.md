# Tutorial on Services

Services are global objects that provide static utility functions. An example:

```javascript
import dataService from "../../src/services/DataService"
import dataAnalysisService from "../../src/services/DataAnalysisService"
import QUESTIONNAIRE_TYPE from "../../src/constants/QuestionnaireType"

dataService.importData("./tests/test-data/SUS-example.csv", QUESTIONNAIRE_TYPE.SUS)
				.then(dataEntity => {
    				const scores = dataAnalysisService.calculateScores(dataEntity)
                    console.log(scores)
				})
```

Service objects are usually straightforward. You are encouraged to refer to the source code in `src\services` to learn about them.

## `dataService`

This service deal with import/export of `DataEntity`.

Particularly, `dataService.importData` is a asynchronous function that generates a `DataEntity` from a CSV file.

If you are not familiar with asynchronous functions, see https://www.w3schools.com/js/js_async.asp.

## `dataAnalysisService`

This service deal with data analysis. It calculated scores base on questionnaire type.