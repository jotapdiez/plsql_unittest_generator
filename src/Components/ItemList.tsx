import React, { useEffect, useState, useContext } from 'react'
import { Option, Item } from '../constants'
import { NewItem } from './NewItem';
// import 'semantic-ui-css/semantic.min.css';
import { Menu, Container, Button, Grid } from 'semantic-ui-react'
import { ItemContextProvider, ItemContext } from '../context/ItemTestContext'

type Props = {
    options: Option[];
    items: Item[];
    setmethod: any;
}

export const ProvidedItemList = ({ options, items, setmethod }: Props) => {
    const [showNew, setShowNew] = useState(false);
    const [disableActionButtons, setDisableActionButtons] = useState(true);
    // const [selectedKey, setSelectedKey] = useState<string | null>(items.length > 0 ? items[0].id : '');
    const { id, label, optionId, content, contentTarget} = useContext(ItemContext);
    const [activeIndex, setActiveIndex] = useState<any | Number>(items.length > 0 ? 0 : -1);

    useEffect(() => {
        // setDisableActionButtons(selectedKey === null);
        setDisableActionButtons(activeIndex === -1);
    }, [activeIndex]);

    const validarNuevo = () => {
        return true;
    }

    const guardarNuevo = () => {
        if (!validarNuevo()) {
            return;
        }

        setmethod([...items, {
            id: id,
            // setId:null,
            label: label,
            // setLabel: null,
            optionId: optionId,
            // setOptionId: null,
            content: content,
            // setContent: null,
            contentTarget,
        }]);
        setShowNew(false);
    }

    // const [panes, setPanes] = useState<any>([]);

    // useEffect(() => {
    //     let newPanes = [];
    //     let newActiveIndex = activeIndex;

    //     if (showNew) {
    //         newPanes = [...panes, {
    //             key: id, menuItem: label, render: () => <Grid>
    //                 <Grid.Row>
    //                     <NewItem options={options} />
    //                 </Grid.Row>
    //                 <Grid.Row>
    //                     <Button variant="success" onClick={() => {guardarNuevo();}}>Crear</Button>
    //                     <Button variant="link" onClick={() => { setShowNew(false); }}>Cancelar </Button>
    //                 </Grid.Row>
    //             </Grid>
    //         }];
    //         newActiveIndex = newPanes.length-1;
    //     } else {
    //         newPanes = items.map((item: Item) => {
    //             return { key: item.id, menuItem: item.label, render: () => <Tab.Pane><SQLEditor content={item.content} /><pre>{item.content}</pre></Tab.Pane> }
    //         });
    //     }

    //     setPanes(newPanes);
    //     setActiveIndex(newActiveIndex);
    // }, [showNew, items]);

    return (<Container fluid>
        <Grid>
            <Grid.Row>
                <Grid.Column width={1}>
                    <Button.Group vertical>
                        <Button onClick={() => {
                            setShowNew(true);
                            // setSelectedKey('idnew');
                            setActiveIndex(-1);
                        }} icon='plus' color='green'/>
                        <Button disabled={disableActionButtons} icon='angle double up'/>
                        <Button disabled={disableActionButtons} icon='angle up' />
                        <Button disabled={disableActionButtons} icon='angle down' />
                        <Button disabled={disableActionButtons} icon='angle double down' />
                        <Button disabled={disableActionButtons} icon='close' color='red' />
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width={15}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <Menu fluid vertical tabular>
                                    {items.length > 0 ? items.map((item, index) => {
                                        return (<Menu.Item
                                                key={item.id}
                                                name={item.label}
                                                active={activeIndex===index}
                                            onClick={() => {
                                                setActiveIndex(index);
                                                setShowNew(false);
                                            }}
                                            />)
                                    }):null}
                                    {showNew ? (<Menu.Item
                                        name={label}
                                        active={true}
                                        // onClick={() => setActiveIndex(index)}
                                    />) : null}
                                    {items.length === 0 && !showNew ? (<Menu.Item
                                            name='No hay elementos'
                                            active={true}
                                        />) : null}
                                </Menu>
                            </Grid.Column>
                            <Grid.Column width={14}>
                                {activeIndex > -1 ? (<>
                                    {/* <SQLEditor key={items[activeIndex].id} content={items[activeIndex].content} /> */}
                                    <ItemContext.Provider value={items[activeIndex]}>
                                        <NewItem options={options} />
                                    </ItemContext.Provider>
                                </>) : null}
                                {showNew ? (<>
                                        <NewItem options={options} />
                                        <Button primary onClick={() => { guardarNuevo(); }}>Crear</Button>
                                        <Button onClick={() => { setShowNew(false); }}>Cancelar </Button>
                                    </>) : null}
                                </Grid.Column>
                            </Grid.Row>
                    </Grid>
                    {/* <Tab
                        menu={{ fluid: true, vertical: true }}
                        menuPosition='left'
                        activeIndex={activeIndex}
                        onTabChange={({ activeIndex }: TabProps) => setActiveIndex(activeIndex)}
                        panes={panes}
                    /> */}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>);

    // return (<Container fluid="xl">
    //     <Tab.Container id="left-tabs-example" activeKey={selectedKey}>
    //         <Row>
    //             <Col lg={1}>
    //                 <Button variant="link" onClick={() => {
    //                         setShowNew(true);
    //                         setSelectedKey('idnew');
    //                     }}>
    //                     <FontAwesomeIcon icon={faPlus} size="2x" color="green" />
    //                 </Button>
    //                 <Button variant="link" disabled={disableActionButtons}>
    //                     <FontAwesomeIcon icon={faAngleDoubleUp} size="2x"/>
    //                 </Button>
    //                 <Button variant="link" disabled={disableActionButtons}>
    //                     <FontAwesomeIcon icon={faAngleUp} size="2x" />
    //                 </Button>
    //                 <Button variant="link" disabled={disableActionButtons}>
    //                     <FontAwesomeIcon icon={faAngleDown} size="2x" />
    //                 </Button>
    //                 <Button variant="link" disabled={disableActionButtons}>
    //                     <FontAwesomeIcon icon={faAngleDoubleDown} size="2x" />
    //                 </Button>
    //                 <Button variant="link" disabled={disableActionButtons}>
    //                     <FontAwesomeIcon icon={faTimes} size="2x"/>
    //                 </Button>
    //             </Col>
    //             <Col lg={3}>
    //                 <Nav variant="pills" className="flex-column" onSelect={( key ) => {
    //                     setSelectedKey(key);
    //                     setShowNew(false);
    //                 }}>
    //                     {items.map(item => {
    //                         return (<Nav.Item key={item.id}>
    //                             <Nav.Link eventKey={item.id}>{item.label}</Nav.Link>
    //                         </Nav.Item>)
    //                     })}
    //                     {showNew ? (<Nav.Item key={id}>
    //                             <Nav.Link eventKey={id}>{label}</Nav.Link>
    //                     </Nav.Item>) : null}
    //                     {items.length === 0 && !showNew ? <span>No hay items</span> : null}
    //                 </Nav>
    //             </Col>
    //             <Col lg={8}>
    //                 {showNew ? (<>
    //                     <Row>
    //                         <Col>
    //                             <NewItem options={options} />
    //                         </Col>
    //                         </Row>
    //                     <Row>
    //                             <Col>
    //                             <Button variant="success" onClick={() => {
    //                                 guardarNuevo();
    //                             }}>Crear</Button>
    //                             <Button variant="link" onClick={() => {
    //                                 setShowNew(false);
    //                             }}>Cancelar </Button>
    //                         </Col>
    //                         </Row>
    //                     </>) :
    //                     (<Tab.Content>
    //                         {items.map(item => {
    //                             return (<Tab.Pane eventKey={item.id} key={item.id}>
    //                                 <SQLEditor content={item.content}/>
    //                             </Tab.Pane>)
    //                         })}
    //                     </Tab.Content>)
    //                 }
    //             </Col>
    //         </Row>
    //     </Tab.Container>
    //     </Container>)
}

export const ItemList = ({ options, items, setmethod }: Props) => {
    return (<ItemContextProvider>
        <ProvidedItemList options={options} items={items} setmethod={setmethod}/>
    </ItemContextProvider >)

}