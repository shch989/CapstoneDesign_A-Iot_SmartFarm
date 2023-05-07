import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
  width: 100%;
  background-color: #e0ffff;
  padding-top: 1rem;
  bottom: 0;
`
const MainFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  color: #000;
  width: 60%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Section = styled.div`
  top: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 4rem;

  h4 {
    font-size: 1rem;
    font-weight: bold;
    color: #222;
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.5;

    b {
      font-weight: bold;
      color: #222;
    }
  }
`

const Link = styled.a`
  color: #000;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Footer = () => {
  return (
    <Container>
      <MainFooter>
        <Section>
          <h4>프로젝트 소개</h4>
          <p>
            <b>지도교수 : 황이철 교수(님)</b>
            <br />
            <b>팀명 :</b> 건강하게만 자라다오
            <br />
            <b>팀장 :</b> 전채욱
            <br />
            <b>팀원 :</b> 조성현, 오두환, 박정혁, 이승우
          </p>
        </Section>
        <Section>
          <h4>사용 문의</h4>
          <p>
            <b>Gmail :</b>{' '}
            <Link href="mailto:Tankpop11@gmail.com">Tankpop11@gmail.com</Link>
            <br />
            <b>Tel :</b> 010-9976-2790
            <br />
            <b>A.I Github :</b>{' '}
            <Link href="https://github.com/ETTE154">
              https://github.com/ETTE154
            </Link>
            <br />
            <b>S/W Github :</b>{' '}
            <Link href="https://github.com/shch989">
              https://github.com/shch989
            </Link>
          </p>
        </Section>
        <Section>
          <h4>팀원 역할분담</h4>
          <p>
            <b>A.I 담당자 :</b> 전채욱
            <br />
            <b>S/W 담당자 :</b> 조성현
            <br />
            <b>H/W 담당자 :</b> 오두환
            <br />
            <b>H/W 팀원 :</b> 박정혁, 이승우
            <br />
          </p>
        </Section>
      </MainFooter>
    </Container>
  )
}

export default Footer
