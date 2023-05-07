import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
  width: 100%;
  background-color: #e0ffff;
  bottom: 0;
`

const MainFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  color: #000;
  width: 800px;
  margin: 0 auto;
  padding: 0.7rem 0;
`

const Section = styled.div`
  top: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h4 {
    font-size: 1rem;
    font-weight: bold;
    color: #222;
    margin: 0;
    margin-bottom: 5px;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.5;
    margin: 0;

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

const teamMembers = [
  {
    sectionTitle: '프로젝트 소개',
    sectionContent: [
      {
        title: '팀명',
        content: '건강하게만 자라다오',
      },
      {
        title: '지도교수',
        content: '황이철 교수(님)',
      },
      {
        title: '팀장',
        content: '전채욱',
      },
      {
        title: '팀원',
        content: '조성현, 오두환, 박정혁, 이승우',
      },
    ],
  },
  {
    sectionTitle: '사용 문의',
    sectionContent: [
      {
        title: 'Gmail',
        content: (
          <Link href="mailto:Tankpop11@gmail.com">Tankpop11@gmail.com</Link>
        ),
      },
      {
        title: 'Tel',
        content: '010-9976-2790',
      },
      {
        title: 'A.I Github',
        content: (
          <Link href="https://github.com/ETTE154">
            https://github.com/ETTE154
          </Link>
        ),
      },
      {
        title: 'S/W Github',
        content: (
          <Link href="https://github.com/shch989">
            https://github.com/shch989
          </Link>
        ),
      },
    ],
  },
  {
    sectionTitle: '팀원 역할분담',
    sectionContent: [
      {
        title: 'A.I 담당자',
        content: '전채욱',
      },
      {
        title: 'S/W 담당자',
        content: '조성현',
      },
      {
        title: 'H/W 담당자',
        content: '오두환',
      },
      {
        title: 'H/W 팀원',
        content: '박정혁, 이승우',
      },
    ],
  },
]

const Footer = () => {
  return (
    <Container>
      <MainFooter>
        {teamMembers.map((member, index) => (
          <Section key={index}>
            <h4>{member.sectionTitle}</h4>
            {member.sectionContent.map((content, index) => (
              <p key={index}>
                <b>{content.title}: </b>
                {content.content}
              </p>
            ))}
          </Section>
        ))}
      </MainFooter>
    </Container>
  )
}
export default Footer
