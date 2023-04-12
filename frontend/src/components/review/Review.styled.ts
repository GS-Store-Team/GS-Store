import styled from "styled-components";

const Review = styled.div`
  padding: 5px 20px 15px 20px;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6)
  }
`

const Body = styled.div`
  margin-top: 3px;
  font-size: 14px;
  background-color: #eaeaea;
  border-radius: 3px;
  padding: 5px 10px;
  border: 1px solid rgba(162, 162, 162, 0.7);
`

const Nickname = styled.div`
  padding: 0 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    color: #34678c
  }
`

const Date = styled.div`
  color: gray;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: flex-end;
`

const Edited = styled.div`
  padding-left: 5px;
  cursor: pointer;
  &:hover{
    color: #34678c
  }
`

const Rate = styled.div`
  padding: 0 3px;
  font-weight: bold;
`

const Menu = styled.div`
  width: 18px;
  height: 18px;
  transform: translate(0, -3px);
  opacity: 0.4;
  cursor: pointer;
  &:hover{opacity: 1}
`

const Avatar = styled.div`
  cursor: pointer;
  &:hover{scale: 1.2}
`

const NewReview = styled.div`
  padding: 0 20px;
`

const Cross = styled.div`
  padding: 5px;
  cursor: pointer;
  opacity: 0.5;
  &:hover{ opacity: 1}
`

const Title = styled.div`
  padding: 60px 30px 20px 20px;
  overflow: hidden;
  font-size: 26px;
`

const Area = styled.div`
  height: 100%;
  min-width: 300px;
  width: 500px;
  background-color: rgba(245, 243, 243, 0.85);
`

const Reviews = styled.div`
  height: 450px;
  overflow: auto;
  word-wrap: break-word;
`

const Filters = styled.div`
  opacity: 0.6;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  &:hover{opacity: 1}
`

const NoComments = styled.div`
  padding: 20px;
  height: 450px;
`

const ScrollSection = styled.div`
  width: 100%;
  height: 200px;
  flex: 1 1 auto;
  overflow-block: auto;
  overflow: auto;
`

export const Styled = {
    Review,
    Body,
    Nickname,
    Rate,
    Date,
    Edited,
    Menu,
    Avatar,
    NewReview,
    Cross,
    Title,
    Area,
    Reviews,
    Filters,
    NoComments,
    ScrollSection
}