import React from 'react'
import styled from 'styled-components'
import poto from '../public/poto.png'

const StyledHome = styled.div`
  .posts {
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    gap: 100px;

    .post {
      display: flex;
      gap: 100px;

      &:nth-child(2n + 1) {
        flex-direction: row-reverse;
      }

      .img {
        flex: 2;
        position: relative;
        height: 100%;

        img {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
        }
      }

      .content {
        flex: 3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h1 {
          font-size: 48px;
          margin: 0;
          margin-top: 20px;
        }

        p {
          font-size: 18px;
        }

        button {
          width: max-content;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          background-color: white;
          border: 1px solid teal;
          color: teal;
          margin-bottom: 20px;

          &:hover {
            border: 1px solid white;
            background-color: #e0ffff;
            color: black;
          }
        }
      }
    }
  }
`

const HomePage = () => {
  const posts = [
    {
      id: 1,
      title: 'Project Title No.1',
      desc: 'Project Description No.1',
      img: poto,
    },
    {
      id: 2,
      title: 'Project Title No.2',
      desc: 'Project Description No.2',
      img: poto,
    },
    {
      id: 3,
      title: 'Project Title No.3',
      desc: 'Project Description No.3',
      img: poto,
    },
    {
      id: 4,
      title: 'Project Title No.4',
      desc: 'Project Description No.4',
      img: poto,
    },
  ]
  return (
    <StyledHome>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <h1>{post.title}</h1>
              <p>{post.desc}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </StyledHome>
  )
}

export default HomePage
