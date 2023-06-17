import React, { Fragment } from 'react'
import styled from 'styled-components'
// Components
import MainBody from '../components/UI/MainBody'
import DhtGraph from '../components/Graph/DhtGraph'
import WeatherGraph from '../components/Graph/WeatherGraph'

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 25px;
`

const SmallGraphBox = styled.div`
  display: flex;
  width: calc(50% - 20px);
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0ffff;
  padding: 15px;
`

const LargeGraphBox = styled.div`
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0ffff;
  padding: 30px;
`

const GraphPage = () => {
  return (
    <MainBody>
      <Row>
        <SmallGraphBox>
          <DhtGraph sensor={'temperature'} />
        </SmallGraphBox>
        <SmallGraphBox>
          <DhtGraph sensor={'humidity'} />
        </SmallGraphBox>
      </Row>
      <Row>
        <LargeGraphBox>
          <WeatherGraph />
        </LargeGraphBox>
      </Row>
    </MainBody>
  )
}

export default GraphPage
