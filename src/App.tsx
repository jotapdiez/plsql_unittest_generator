import React, { useEffect, useContext, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Segment, Button } from 'semantic-ui-react'
import { UnitTestContext, UnitTestContextProvider, unitTestContextDefaultValue } from './context/UnitTestContext';
import XmlGenerator from './XmlGenerator';
import XmlViewer from './Components/XmlViewer';

import General from './General'
import Startup from './Startup'
import Teardown from './Teardown'
import Validations from './Validations'
import Presentation from './Presentation'

function App() {
  const [generateXmlEnabled, setGenerateXmlEnabled] = useState(false);
  const [salidaXmlEnabled, setSalidaXmlEnabled] = useState(false);
  const [generatedXml, setGeneratedXml] = useState('');
  const [activeTab, setActiveTab] = useState('pres');
  const [tabContent, setTabContent] = useState(<Presentation />);

  const { nombre, owner, pkg, procedure } = useContext(UnitTestContext);

  useEffect(() => {
    setGenerateXmlEnabled(nombre !== '' && owner !== '' && pkg !== '' && procedure !== '');
  }, [nombre, owner, pkg, procedure]);

  useEffect(() => {
    setSalidaXmlEnabled(generatedXml !== '');
  }, [generatedXml]);

  const generateXml = () => {
    let xml = XmlGenerator(unitTestContextDefaultValue);
    setGeneratedXml(xml);
  }

  return (<>
        <Menu attached='top' tabular>
          <Menu.Item
            name='general'
            active={activeTab === 'general'}
            onClick={() => { setActiveTab('general'); setTabContent(<General />) }}
          />
          <Menu.Item
            name='startup'
            active={activeTab === 'startup'}
            onClick={() => { setActiveTab('startup'); setTabContent(<Startup />) }}
          />
          <Menu.Item
            name='teardown'
            active={activeTab === 'teardown'}
            onClick={() => { setActiveTab('teardown'); setTabContent(<Teardown />) }}
          />
          <Menu.Item
            name='validations'
            active={activeTab === 'validations'}
            onClick={() => { setActiveTab('validations'); setTabContent(<Validations />) }}
          />
          <Menu.Item
            name='presentation'
            active={activeTab === 'pres'}
            onClick={() => { setActiveTab('pres'); setTabContent(<Presentation />) }}
          />
          <Menu.Item
            name='output'
            disabled={!salidaXmlEnabled}
            active={activeTab === 'output'}
            onClick={() => { setActiveTab('output'); setTabContent(<XmlViewer xml={generatedXml} />) }}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button variant="link">Limpiar</Button>
              <Button primary disabled={!generateXmlEnabled} onClick={generateXml}>Generar XML</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment attached='bottom' compact={false}>
          {tabContent}
        </Segment>
  </>)
}

function AppProvided() {
  return (<UnitTestContextProvider><App/></UnitTestContextProvider>);
}

export default AppProvided;
