// C:\Users\jiangyukun\AppData\Local\Yarn\Cache\


let a = {
    "results": {
        "id": 80,
        "name": null,
        "title": "1号电站",
        "type": "Station",
        "sn": null,
        "children": [{
            "id": 82,
            "name": null,
            "title": "1号能量单元",
            "type": "EnergyUnit",
            "sn": null,
            "children": [{
                "id": null,
                "name": "Breaker",
                "title": "开关",
                "type": "VirtualNode",
                "sn": 1,
                "children": [{
                    "id": 1079,
                    "name": null,
                    "title": "我是开关",
                    "type": "Breaker",
                    "sn": null,
                    "children": []
                }, {"id": 758, "name": null, "title": "4#开关", "type": "Breaker", "sn": null, "children": []}]
            }, {
                "id": null,
                "name": "PowerTransformer",
                "title": "变压器",
                "type": "VirtualNode",
                "sn": 2,
                "children": [{
                    "id": 951,
                    "name": null,
                    "title": "2#变压器",
                    "type": "PowerTransformer",
                    "sn": null,
                    "children": []
                }]
            }, {
                "id": null,
                "name": "Battery",
                "title": "电池",
                "type": "VirtualNode",
                "sn": 4,
                "children": [{
                    "id": 529,
                    "name": "1#BatteryUnit",
                    "title": "1#电池单元",
                    "type": "BatteryUnit",
                    "sn": null,
                    "children": [{
                        "id": 530,
                        "name": "1#BatteryCluster",
                        "title": "1#电池簇",
                        "type": "BatteryCluster",
                        "sn": null,
                        "children": [{
                            "id": 531,
                            "name": "1#Pack",
                            "title": "1#电池包",
                            "type": "Pack",
                            "sn": null,
                            "children": [{
                                "id": 1014,
                                "name": "1#Cell",
                                "title": "1#电池单体",
                                "type": "Cell",
                                "sn": null,
                                "children": []
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }, "errorCode": 0
}


let b = {
    "results": [{"name": "开关", "value": 306, "type": "Breaker"}, {
        "name": "变压器",
        "value": 307,
        "type": "PowerTransformer"
    }, {"name": "PCS/UPS", "value": 308, "type": "PCS/UPS"}, {
        "name": "电池单元",
        "value": 309,
        "type": "BatteryUnit"
    }, {"name": "电池簇/组/串", "value": 310, "type": "BatteryCluster"}, {
        "name": "电池包",
        "value": 311,
        "type": "Pack"
    }, {"name": "单体电池", "value": 312, "type": "Cell"}, {
        "name": "自定义设备2",
        "value": 515,
        "type": "testtest2"
    }, {"name": "自定义设备", "value": 670, "type": "testtest"}, {"name": "自定义设备3", "value": 915, "type": "testtest3"}],
    "errorCode": 0,
    "errorMsg": ""
}


let c = {
    "results": [{
        "id": 313,
        "code": 1,
        "name": "title",
        "title": "设备名称",
        "sn": 1,
        "type": "String",
        "suffix": null,
        "enumValues": null,
        "mustFill": true
    }, {
        "id": 314,
        "code": 2,
        "name": "deviceType",
        "title": "设备类型",
        "sn": 2,
        "type": "Enum",
        "suffix": null,
        "enumValues": [{"name": "Breaker", "id": 306, "title": "开关", "type": "DeviceType"}, {
            "name": "PowerTransformer",
            "id": 307,
            "title": "变压器",
            "type": "DeviceType"
        }, {"name": "PCS/UPS", "id": 308, "title": "PCS/UPS", "type": "DeviceType"}, {
            "name": "BatteryUnit",
            "id": 309,
            "title": "电池单元",
            "type": "DeviceType"
        }, {"name": "BatteryCluster", "id": 310, "title": "电池簇/组/串", "type": "DeviceType"}, {
            "name": "Pack",
            "id": 311,
            "title": "电池包",
            "type": "DeviceType"
        }, {"name": "Cell", "id": 312, "title": "单体电池", "type": "DeviceType"}, {
            "name": "testtest2",
            "id": 515,
            "title": "自定义设备2",
            "type": "DeviceType"
        }, {"name": "testtest", "id": 670, "title": "自定义设备", "type": "DeviceType"}, {
            "name": "testtest3",
            "id": 915,
            "title": "自定义设备3",
            "type": "DeviceType"
        }],
        "mustFill": true
    }, {
        "id": 315,
        "code": 3,
        "name": "number",
        "title": "设备编号",
        "sn": 3,
        "type": "String",
        "suffix": null,
        "enumValues": null,
        "mustFill": false
    }, {
        "id": 316,
        "code": 4,
        "name": "activity",
        "title": "设备有效性",
        "sn": 4,
        "type": "Boolean",
        "suffix": null,
        "enumValues": null,
        "mustFill": true
    }, {
        "id": 317,
        "code": 5,
        "name": "iNodeName",
        "title": "I侧节点名称",
        "sn": 5,
        "type": "String",
        "suffix": null,
        "enumValues": null,
        "mustFill": false
    }, {
        "id": 318,
        "code": 6,
        "name": "iNode_terminalVoltageLevel",
        "title": "I侧I侧基准线电压",
        "sn": 6,
        "type": "Enum",
        "suffix": null,
        "enumValues": [{
            "isDefault": false,
            "name": "110V",
            "sn": 1,
            "id": 72,
            "type": "VoltageLevel"
        }, {"isDefault": false, "name": "220V", "sn": 2, "id": 73, "type": "VoltageLevel"}, {
            "isDefault": false,
            "name": "380V",
            "sn": 3,
            "id": 74,
            "type": "VoltageLevel"
        }],
        "mustFill": false
    }, {
        "id": 319,
        "code": 7,
        "name": "jNodeName",
        "title": "J侧节点名称",
        "sn": 7,
        "type": "String",
        "suffix": null,
        "enumValues": null,
        "mustFill": false
    }, {
        "id": 320,
        "code": 8,
        "name": "jNode_terminalVoltageLevel",
        "title": "J侧J侧基准线电压",
        "sn": 8,
        "type": "Enum",
        "suffix": null,
        "enumValues": [{
            "isDefault": false,
            "name": "110V",
            "sn": 1,
            "id": 72,
            "type": "VoltageLevel"
        }, {"isDefault": false, "name": "220V", "sn": 2, "id": 73, "type": "VoltageLevel"}, {
            "isDefault": false,
            "name": "380V",
            "sn": 3,
            "id": 74,
            "type": "VoltageLevel"
        }],
        "mustFill": false
    }, {
        "id": 321,
        "code": 9,
        "name": "breakerPosition",
        "title": "常态位置",
        "sn": 9,
        "type": "Enum",
        "suffix": null,
        "enumValues": [{
            "isDefault": false,
            "name": "on",
            "sn": 1,
            "id": 952,
            "title": "常合",
            "type": "BreakerPosition"
        }, {
            "isDefault": false,
            "name": "on",
            "sn": 1,
            "id": 851,
            "title": "常合",
            "type": "BreakerPosition"
        }, {
            "isDefault": false,
            "name": "off",
            "sn": 2,
            "id": 953,
            "title": "常断",
            "type": "BreakerPosition"
        }, {"isDefault": false, "name": "off", "sn": 2, "id": 852, "title": "常断", "type": "BreakerPosition"}],
        "mustFill": true
    }, {
        "id": 322,
        "code": 10,
        "name": "ratedCurrent",
        "title": "额定电流",
        "sn": 10,
        "type": "Float",
        "suffix": "A",
        "enumValues": null,
        "mustFill": true
    }, {
        "id": 323,
        "code": 11,
        "name": "remark",
        "title": "备注",
        "sn": 11,
        "type": "String",
        "suffix": null,
        "enumValues": null,
        "mustFill": false
    }], "page": 0, "size": 11, "totalCount": 11, "totalPages": 1, "errorCode": 0
}


let d = {
    "results": {
        "id": 82,
        "code": 11020100001,
        "name": "1#EnergyUnit",
        "title": "1号能量单元",
        "ratedPower": 1,
        "scale": 2,
        "remark": "备注一下",
        "hasTransformer": true,
        "activity": null,
        "productionTime": null,
        "energyUnitTypeId": null,
        "energyUnitTypeTitle": null,
        "measurePointId": null,
        "measurePointTitle": null,
        "inputOutputModeId": null,
        "inputOutputModeTitle": null,
        "electricityModeId": null,
        "electricityModeTitle": null,
        "voltageLevelId": null,
        "voltageLevelTitle": null,
        "type": null
    }, "errorCode": 0
}