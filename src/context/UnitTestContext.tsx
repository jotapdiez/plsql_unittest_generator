import React, { useState, createContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
    UnitTest,
    PLSQL_CODE,
    COMPARE_QUERY,
} from '../constants'

export const unitTestContextDefaultValue: UnitTest = {
    id: uuidv4(),
    nombre: 'EstimadorCajasEdificio_Historia34_Caso4',
    owner: 'A001808',
    pkg: 'PKG_CALCULAR_CAJAS_TRT',
    procedure: 'CALCULAR_CAJAS',
    objType: 'procedure',
    expectedResult: 'success',
    gatherStatistics: false,
    startups: [
        {
            id: uuidv4(),
            label: 'Limpio errores y logs e inserto datos',
            optionId: PLSQL_CODE.id,
            content: `BEGIN
    DELETE FROM GI$_ERROR_CONTEXT;
    DELETE FROM GI$_ERROR_INSTANCE;
    DELETE FROM GI$_ERROR;

    EXECUTE IMMEDIATE 'TRUNCATE TABLE GI$_LOG';
    EXECUTE IMMEDIATE 'TRUNCATE TABLE CE_LOTE_CALCULAR_CAJAS';
    EXECUTE IMMEDIATE 'TRUNCATE TABLE CE_LOTE_CAJAS_EDIFICIO_HFC';
    EXECUTE IMMEDIATE 'TRUNCATE TABLE CE_LOTE_CAJAS_EDIFICIO_FTTH';

    -- EQ_TYPE=10 ONT
    Insert into ETL_DIRECCIONES_OPEN (LOCATION_ID,SITE_USE_CODE,COUNTRY_CODE,PROVINCE_NAME,COUNTY_NAME,CITY_NAME,NEIGHBORHOOD_NAME,STREET_NAME,STREET_NUMBER,STREET_NUMBER_COMP,STREET_NUMBER_DOUBLE,STREET_REF_NAME1,STREET_REF_NAME2,POSTAL_CODE,TOWER,BLOCK,FLOOR,APARTMENT,COMMENTS,SIDEWALK_ID,TECHNICAL_AREA_ID,COMMERCIAL_AREA_ID,DISTRIBUTION_AREA_ID,EQUIPMENT_ID,DATE_CREATED,CREATED_BY,OPERATION,X,Y,PRIMARY_LOCATION_ID) values ('9999899991','Y','ARGENTINA','CORDOBA','CAPITAL','CORDOBA','ESCOBAR','BIO BIO','2735',null,null,'RUFINO CUERVO','ZIPOLI DOMINGO','5009',null,null,null,null,null,'10121494','CBN017','Zona Comercial  para no normalizados','DCBA053',null,to_date('21/02/2012','DD/MM/RRRR'),'PowerCenter',null,'5098552,83436341465300819617663648443284','6520015,92658364597524390120087514191275','9999899991');
    Insert into ETL_PRODUCTOS_OPEN (PERSON_ID,PRODUCT_ID,CONTRACT_ID,LOCATION_ID,PRODUCT_TYPE,BUSINESS_LINE,EQUIPMENT_ID,COMPANY_ID,FECHA_ULTIMA_CONEXION,FECHA_ULTIMA_DESCONEXION,DATE_CREATED,CREATED_BY,OPERATION,PRODUCT_STATUS_ID,EXTREMO_EXTERNO) values ('217020','9999799991','10033867','9999899991','2','11','9999699991','43',to_date('01/01/1990','DD/MM/RRRR'),null,to_date('21/02/2012','DD/MM/RRRR'),'PowerCenter',null,'1','N');
    Insert into ETL_SERIALIZABLES_OPEN (EQ_ID,EQ_TYPE_ID,SERIAL_NUMBER,ACTIVE_START_DATE,INSTALL_DATE,CREATION_DATE,LAST_UPDATE_DATE,ACCOUNT_ID_1,ACCOUNT_ID_2,ATTRIBUTE01,ATTRIBUTE02,ATTRIBUTE03,ATTRIBUTE04,ATTRIBUTE05,ATTRIBUTE06,ATTRIBUTE07,ATTRIBUTE08,ATTRIBUTE09,ATTRIBUTE10,PUBLISH_DATE,CREATED_BY) values ('9999699991','10','SERIAL_NUMBER_EQT10',to_date('13/06/2008','DD/MM/RRRR'),to_date('13/06/2008','DD/MM/RRRR'),to_date('23/12/2003','DD/MM/RRRR'),to_date('14/12/2013','DD/MM/RRRR'),'12185522',null,'N',null,'3',null,null,null,null,null,null,null,to_date('15/12/2013','DD/MM/RRRR'),'PowerCenter');
    Insert into CE_EDIFICIOS (ID,PAIS_NOMBRE,PROVINCIA_NOMBRE,PARTIDO_NOMBRE,LOCALIDAD_NOMBRE,CALLE_NOMBRE,ALTURA,CODIGO_POSTAL,X,Y,ID_LOTE_ALTA,FK_TIPO_LOTE_ALTA,FECHA_ALTA,FK_MOTIVO_ALTA,ID_LOTE_BAJA,FK_TIPO_LOTE_BAJA,FECHA_BAJA,FK_MOTIVO_BAJA,DESCRIPCION_BAJA,GENERA_CAJA_EDIFICIO,ID_LOTE_DEPURADOR) values('9999999991','ARGENTINA','CORDOBA','CAPITAL','CORDOBA','BIO BIO','2735', null,'1','1',to_number(TO_CHAR(to_timestamp(current_timestamp-(1/72)), 'YYYYMMDDHH24MISSFF')),'5', current_timestamp,'8','0', null, null, null, null,'1','0' );
    Insert into CE_DOMICILIO_EDIFICIO (ID,FK_EDIFICIO,FK_DOMICILIO,ID_LOTE_BAJA,ID_LOTE_ALTA,ID_LOTE_DEPURADOR) values ('9999599991','9999999991','9999899991','0',to_number(TO_CHAR(to_timestamp(current_timestamp-(1/72)), 'YYYYMMDDHH24MISSFF')),'0');

    -- lote fantasma para que tome solo los edificios de este caso
    Insert into CE_LOTE_CALCULAR_CAJAS (ID,FECHA_INICIO,FECHA_FIN,ESTADO) values (to_number(TO_CHAR(to_timestamp(current_timestamp-(1/48)), 'YYYYMMDDHH24MISSFF')),to_timestamp('22/10/2020 05:12:22,962212000 PM','DD/MM/RRRR HH12:MI:SSXFF AM'),null,'EJECUTADO');
    Insert into CE_LOTE_CAJAS_EDIFICIO_HFC (ID,CALCULO_DESDE,CALCULO_HASTA,FECHA_INICIO,FECHA_FIN,ESTADO) values (to_number(TO_CHAR(to_timestamp(current_timestamp-(1/48)), 'YYYYMMDDHH24MISSFF')),0,to_number(TO_CHAR(to_timestamp(current_timestamp-1), 'YYYYMMDDHH24MISSFF')),to_timestamp('22/10/2020 01:00:00,985700000 PM','DD/MM/RRRR HH12:MI:SSXFF AM'),to_timestamp('22/10/2020 05:13:22,985700000 PM','DD/MM/RRRR HH12:MI:SSXFF AM'),'EJECUTADO');
    Insert into CE_LOTE_CAJAS_EDIFICIO_FTTH (ID,CALCULO_DESDE,CALCULO_HASTA,FECHA_INICIO,FECHA_FIN,ESTADO) values (to_number(TO_CHAR(to_timestamp(current_timestamp-(1/48)), 'YYYYMMDDHH24MISSFF')),0,to_number(TO_CHAR(to_timestamp(current_timestamp-1), 'YYYYMMDDHH24MISSFF')),to_timestamp('22/10/2020 01:00:00,985700000 PM','DD/MM/RRRR HH12:MI:SSXFF AM'),to_timestamp('22/10/2020 05:13:22,985700000 PM','DD/MM/RRRR HH12:MI:SSXFF AM'),'EJECUTADO');

    COMMIT;
end;
`,
        }
    ],
    teardowns: [{
        id: uuidv4(),
        label: 'Restauro',
        optionId: PLSQL_CODE.id,
        content: `BEGIN
    EXECUTE IMMEDIATE 'TRUNCATE TABLE CE_LOTE_CALCULAR_CAJAS';
    EXECUTE IMMEDIATE 'TRUNCATE TABLE CE_LOTE_CAJAS_EDIFICIO_HFC';
    EXECUTE IMMEDIATE 'TRUNCATE TABLE CE_LOTE_CAJAS_EDIFICIO_FTTH';

    DELETE FROM ETL_DIRECCIONES_OPEN WHERE LOCATION_ID=9999899991;
    DELETE FROM ETL_PRODUCTOS_OPEN WHERE PRODUCT_ID=9999799991;
    DELETE FROM ETL_SERIALIZABLES_OPEN WHERE EQ_ID=9999699991;
    DELETE FROM CE_CAJAS_EDIFICIOS WHERE FK_EDIFICIO=9999999991;
    DELETE FROM CE_EDIFICIOS WHERE ID=9999999991;
    DELETE FROM CE_DOMICILIO_EDIFICIO WHERE ID=9999599991;
    commit;
end;
`,
    }],
    validations: [{
        id: uuidv4(),
        label: 'Lote correcto',
        optionId: COMPARE_QUERY.id,
        content: `SELECT COUNT(1) AS RES FROM CE_LOTE_CALCULAR_CAJAS WHERE  ESTADO='EJECUTADO' AND FECHA_INICIO>(current_timestamp-(1/24)) AND FECHA_FIN IS NOT NULL;`,
        contentTarget: `SELECT 1 AS RES FROM DUAL;`,
    }, {
            id: uuidv4(),
            label: 'Lote HFC correcto',
            optionId: COMPARE_QUERY.id,
            content: `SELECT COUNT(1) AS RES FROM CE_LOTE_CAJAS_EDIFICIO_HFC WHERE  ESTADO='EJECUTADO' AND FECHA_INICIO>(current_timestamp-(1/24)) AND FECHA_FIN IS NOT NULL;`,
            contentTarget: `SELECT 1 AS RES FROM DUAL;`,
        }, {
            id: uuidv4(),
            label: 'Lote FTTH correcto',
            optionId: COMPARE_QUERY.id,
            content: `SELECT COUNT(1) AS RES FROM CE_LOTE_CAJAS_EDIFICIO_FTTH WHERE  ESTADO='EJECUTADO' AND FECHA_INICIO>(current_timestamp-(1/24)) AND FECHA_FIN IS NOT NULL;`,
            contentTarget: `SELECT 1 AS RES FROM DUAL;`,
        }, {
            id: uuidv4(),
            label: 'La caja no fue creada',
            optionId: COMPARE_QUERY.id,
            content: `SELECT COUNT(1) AS RES FROM CE_CAJAS_EDIFICIOS WHERE FK_EDIFICIO=9999999991 AND FECHA_ALTA >(current_timestamp-(1/24));`,
            contentTarget: `SELECT 0 AS RES FROM DUAL;`,
        },
        {
            id: uuidv4(),
            label: 'Errores',
            optionId: COMPARE_QUERY.id,
            content: `SELECT COUNT(1) AS ERRORES FROM GI$_ERROR_INSTANCE;`,
            contentTarget: `SELECT 0 AS ERRORES FROM DUAL;`,
        }],
    parameters: [],
}

export const UnitTestContext = createContext<UnitTest>(unitTestContextDefaultValue);

type ChildrenProps = {
    children: React.ReactNode
};

export const UnitTestContextProvider = ({ children }: ChildrenProps) => {
    const [id, setId] = useState(unitTestContextDefaultValue.id);
    const [nombre, setNombre] = useState(unitTestContextDefaultValue.nombre);
    const [startups, setStartups] = useState(unitTestContextDefaultValue.startups);
    const [teardowns, setTeardowns] = useState(unitTestContextDefaultValue.teardowns);
    const [validations, setValidations] = useState(unitTestContextDefaultValue.validations);
    const [parameters, setParameters] = useState(unitTestContextDefaultValue.parameters);
    const [owner, setOwner] = useState(unitTestContextDefaultValue.owner);
    const [pkg, setPackage] = useState(unitTestContextDefaultValue.pkg);
    const [objType, setObjType] = useState(unitTestContextDefaultValue.objType);
    const [procedure, setProcedure] = useState(unitTestContextDefaultValue.procedure);
    const [expectedResult, setExpectedResult] = useState(unitTestContextDefaultValue.expectedResult);
    const [gatherStatistics, setGatherStatistics] = useState(unitTestContextDefaultValue.gatherStatistics);
    return (
        <UnitTestContext.Provider value={{
            id, setId, nombre, setNombre, startups, setStartups, teardowns, setTeardowns, validations, setValidations, parameters, setParameters, owner, setOwner, pkg, setPackage, procedure, setProcedure, expectedResult, setExpectedResult, gatherStatistics, setGatherStatistics, objType, setObjType }}>
            {children}
        </UnitTestContext.Provider>
    );
};
