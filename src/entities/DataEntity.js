/**
 * A class for representing questionnaire data.
 */
class DataEntity {

    /**
     * Construct empty DataEntity
     */
    constructor() {
        this.type = null
        this.userInfo = null
        this.result = null
    }

    /**
     * Check if the data is valid according to the type.
     * @return {boolean}
     */
    dataIsValid() {
        return true
    }
    
}


/**
 * A class that contains information about users who took
 * the questionnaire.
 */
class UserInfo {

}


/**
 * Questionnaire results.
 */
class Result {

}


export {DataEntity, UserInfo, Result}