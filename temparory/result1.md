abnormalSmsConfigs\index.ts             : Replace: newSetting=>postSetting, Replace: reviseSetting=>patchSetting, Diff   : deleteSetting(_, _, id=>params_id)
alarmEvents\index.ts                    : Replace: getAlarmEventsByStationAndLevelCode=>getAlarmEvents, Replace: getAlarmEventsByStationAndTypeCode=>getAlarmEvents, Diff   : getAlarmEventsById(_, _, params_id=>id), Replace: updateAlarmEvents=>patchAlarmEvents
alarmStatus\index.ts                    : Loss   : getAlarmStatus
analogHistory\index.ts                  : Replace: createAnalogHistory=>postAnalogHistory, Replace: updateAnalogHistory=>deleteAnalogHistory, Diff   : deleteAnalogHistory(_, _, id=>params_id)
analogs\index.ts                        : Diff   : getAnalogsById(_, _, id=>params_id), Replace: createAnalog=>postAnalog, Replace: createAnalogsBatch=>postAnalogsBatch, Replace: updateAnalog=>patchAnalog, Diff   : deleteAnalog(_, _, id=>params_id), Replace: createAnalogTemp=>postAnalogTemp, Replace: createAnalogsTempBatch=>postAnalogsTempBatch, Replace: updateAnalogTemp=>patchAnalogTemp, Diff   : deleteAnalogTemp(_, _, _, id=>params_id), Loss   : getAnalogsByPN
deviceBugRecords\index.ts               : Replace: createDeviceBugRecords=>postDeviceBugRecords, Replace: updateDeviceBugRecords=>putDeviceBugRecords
deviceChangeRecords\index.ts            : Replace: addDeviceChangeRecordsByDevice=>postDeviceChangeRecordsByDevice, Replace: updateDeviceChangeRecordsByDevice=>putDeviceChangeRecordsByDevice, Replace: getDeviceAddOrDelDetail=>putDeviceAddOrDel, Replace: updateDeviceAddOrDel=>putDeviceAddOrDel
devices\index.ts                        : Loss   : getChildDevices, Replace: addDevices=>postDevices, Replace: updateDevices=>putDevices, Replace: updateDevicesBatch=>putDevicesBatch, Loss   : getDataTypes
deviceTypes\index.ts                    : Diff   : getDeviceTypesById(_, _, id=>params_id), Replace: createDeviceTypes=>postDeviceTypes, Replace: updateDeviceTypes=>putDeviceTypes, Diff   : deleteDeviceTypes(_, _, id=>params_id), Diff   : bindPointDataTypeBatch(_, _, deviceTypeId=>id_, _, ), Diff   : isBindDevice(_, _, id=>params_id_, )
differenceAnalysisRecords\index.ts      : Replace: getDifferenceAnalysisRecordsById=>postDifferenceAnalysisRecords, Replace: createDifferenceAnalysisRecords=>postDifferenceAnalysisRecords, Replace: updateDifferenceAnalysisRecords=>putDifferenceAnalysisRecords
differenceCauses\index.ts               : Replace: createDifferenceCauses=>postDifferenceCauses, Replace: updateDifferenceCauses=>putDifferenceCauses, Diff   : deleteDifferenceCauses(_, _, id=>params_id)
electricityBillDetails\index.ts         : Replace: createElectricityBillDetails=>postElectricityBillDetails
energyUnitEfficiencies\index.ts         : Replace: getEnergyUnitEfficiencies=>getEnergyUnitEfficiency
energyUnits\index.ts                    : Diff   : getEnergyUnitsById(_, _, id=>params_id), Replace: createEnergyUnits=>postEnergyUnits, Replace: updateEnergyUnits=>putEnergyUnits, Replace: getEnergyUnitsEfficiency=>getEnergyUnitByDeviceId
energyUnitTypes\index.ts                : Diff   : getEnergyUnitTypesById(_, _, id=>params_id), Replace: createEnergyUnitTypes=>postEnergyUnitTypes, Loss   : updateEnergyUnitTypes, Diff   : deleteEnergyUnitTypes(_, _, id=>params_id), Diff   : isBindEnergyUnit(_, _, id=>params_id_, ), Replace: updateBindDeviceType=>putBindDeviceType
firms\index.ts                          : Diff   : getFirmsById(_, _, id=>params_id), Loss   : addFirmAndUser, Loss   : updateFirms, Diff   : deleteFirms(_, _, req_body_id=>params_id), Replace: isBindStation=>deleteFirms, Loss   : createFirmAndUser
login\index.ts                          : Replace: loginToken=>getVerificationCode, Replace: newVerificationCode=>postVerificationCode
measurements\index.ts                   : Loss   : getMeasurementsRealtimeObject
menus\index.ts                          : Replace: bindByStationType=>getMenusTree
modelAttributes\index.ts                : Replace: getModelAttributesById=>postModelAttributes, Replace: createModelAttributes=>postModelAttributes, Replace: updateModelAttributes=>putModelAttributes, Replace: updateModelAttributesBatch=>putModelAttributesBatch, Diff   : deleteModelAttributes(_, _, id=>params_id)
modelVersions\index.ts                  : Diff   : getModelVersionsById(_, _, id=>params_id), Replace: createModelVersions=>postModelVersions
operationAnalysisRecords\index.ts       : Replace: createOperationAnalysisRecords=>postOperationAnalysisRecords, Replace: updateOperationAnalysisRecords=>putOperationAnalysisRecords
operationConfigs\index.ts               : Replace: findStationIds=>getStationIds, Replace: addOperationIndexConfigs=>postOperationIndexConfigs, Replace: updateOperationIndexConfigs=>putOperationIndexConfigs
performanceRatio\index.ts               : Replace: currentDay=>getCurrentDay, Replace: currentMonth=>getCurrentMonth, Replace: currentYear=>getCurrentYear, Loss   : amount
pointDataType\index.ts                  : Replace: getNewPointDataTypes=>getNewPointDataTypesName, Replace: addPointDataTypes=>postPointDataTypes, Replace: updatePointDataTypes=>putPointDataTypes, Diff   : deletePointDataTypes(_, _, id=>params_id), Loss   : createPointDataTypes
prices\index.ts                         : Replace: getPrice=>getCostPrice, Diff   : getCostPriceById(_, _, _, id=>params_id), Diff   : getGeneratePriceById(_, _, _, id=>params_id), Replace: addCostPrice=>postCostPrice, Replace: addGeneratePrice=>postGeneratePrice, Replace: updateCostPrice=>putCostPrice, Replace: updateStationCostPrice=>patchStationCostPrice, Replace: updateGeneratePrice=>putGeneratePrice, Replace: updateStationGeneratePrice=>patchStationGeneratePrice, Diff   : deleteCostPrice(_, _, _, id=>params_id), Diff   : deleteGeneratePrice(_, _, _, id=>params_id), Loss   : copyCostPrice, Loss   : copyGeneratePrice, Loss   : getCostPriceSeason, Loss   : getSeasonPriceDetailByStation
profits\index.ts                        : Replace: currentDay=>getCurrentDay, Replace: currentMonth=>getCurrentMonth, Replace: currentYear=>getCurrentYear, Replace: amount=>getAmount, Replace: savesLastDetail=>getHistoryYear, Replace: savesAmount=>getHistoryYear
roles\index.ts                          : Replace: addRoles=>postRoles, Replace: updateRoles=>patchRoles, Replace: reviseRoles=>putRoles, Diff   : deleteRoles(_, _, id=>params_id)
runStrategies\index.ts                  : Replace: createRunStrategies=>postRunStrategies, Replace: updateRunStrategies=>putRunStrategies, Diff   : send(_, _, _, id=>params_id), Diff   : deleteRunStrategies(_, _, id=>params_id), Replace: addAuthResults=>postAuthResults, Replace: updateAuthResults=>patchAuthResults
runStrategyTemplates\index.ts           : Diff   : getRunStrategyTemplatesById(_, _, id=>params_id), Replace: createRunStrategyTemplates=>postRunStrategyTemplates, Replace: updateRunStrategyTemplates=>putRunStrategyTemplates, Diff   : deleteRunStrategyTemplates(_, _, id=>params_id)
shiftRecords\index.ts                   : Replace: createShiftRecords=>postShiftRecords, Replace: updateShiftRecords=>putShiftRecords, Replace: addShiftRecordResult=>postShiftRecordResult, Replace: updateShiftRecordResult=>patchShiftRecordResult
stations\index.ts                       : Diff   : getStationsById(_, _, id=>params_id), Replace: addStations=>postStations, Replace: updateStations=>patchStations, Replace: reviseStations=>putStations, Replace: updateStationsGeneratePrice=>deleteStations, Replace: updateStationsCostPrice=>deleteStations, Diff   : deleteStations(_, _, id=>params_id), Loss   : getStationResources
stationTypes\index.ts                   : Diff   : getStationTypesById(_, _, id=>params_id), Replace: createStationTypes=>postStationTypes, Replace: updateStationTypes=>putStationTypes, Diff   : deleteStationTypes(_, _, id=>params_id), Diff   : isBindStation(_, _, id=>params_id_, ), Replace: updateBindEnergyUnitType=>putBindEnergyUnitType
users\index.ts                          : Replace: changePassword=>putPassword, Diff   : resetPassword(_, _, id=>params_id_, ), Replace: addUsers=>postUsers, Replace: updateUsers=>putUsers, Replace: saveUserinfo=>postUserinfo
vpps\index.ts                           : Replace: addVpps=>postVpps, Replace: updateVpps=>patchVpps
workOrders\index.ts                     : Replace: addWorkOrders=>postWorkOrders, Replace: updateWorkOrders=>patchWorkOrders
yield\index.ts                          : Replace: currentDay=>getCurrentDay, Replace: currentMonth=>getCurrentMonth, Replace: currentYear=>getCurrentYear, Replace: amount=>getAmount


abnormalAlarmConfigs\index.ts 找不到
agc\index.ts 找不到
batteryInfo\index.ts 找不到
batteryWholeEfficienicy\index.ts 找不到
costProfitDay\index.ts 找不到
costProfitMonth\index.ts 找不到
energyUsingUnit\energyUsingUnitControllers.ts 找不到
energyUsingUnit\index.ts 找不到
loadUnit\index.ts 找不到
loadUnit\loadUnitControllers.ts 找不到
login\loginControllers.ts 找不到
micro-controllers\index.ts 找不到
monitors\index.ts 找不到
monitors\monitorsControllers.ts 找不到
overhaulPlan\index.ts 找不到
overhaulPlan\overhaulPlanControllers.ts 找不到
PCSWholeEfficienicy\index.ts 找不到
power\index.ts 找不到
power\powerControllers.ts 找不到
PVPower\index.ts 找不到
QR_code\index.ts 找不到
QR_code\QR_codeControllers.ts 找不到
strategyCommandRecord\index.ts 找不到
strategyCommandRecord\strategyCommandRecordControllers.ts 找不到
transformerEfficiency\index.ts 找不到
weathers\weathersControllers.ts 找不到
