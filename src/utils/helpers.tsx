import { userType, followersListType } from "../types/GeneralTypes";

export function filterSharedFollowers (userData: Array<userType>) {
  // Since we search only cross followers - any element is good for base, lets grab shortest
  // let shortestFollowersList = userData.reduce((acc: Array<any>, itm: any) => {
  //   if (itm.followers != null && (acc.length <= 0 || itm.followers.length < acc.length)) {
  //     acc = itm.followers
  //   }
  //   return acc
  //  }, [])

  // const simplifiedFollowersDataset: Array<followersListType> = userData.reduce((acc: followersListType, itm: userType) => {
  //   if (itm.followers != null) {
  //     const followersNames = itm.followers.map(f => f.login)
  //     const simplifiedUser: followersListType = { [itm.username]: followersNames }
  //     acc.push()
  //   }
  //   return acc
  // }, [])
  let shortestFollowersList: any = []
  const simplifiedUserFollowersDataset = userData.map((user: userType) => {
    // if (user.followers != null && (shortestFollowersList.length <= 0 || user.followers.length < shortestFollowersList.length) {
    //   shortestFollowersList = user.followers
    // }
    const followers = user.followers != null ? user.followers.map(f => f.login) : []
    return followers
  })

  const filteredFollowersList: Array<string> = simplifiedUserFollowersDataset.reduce((acc, itm, index) => {
    if (index <= 0) {
      acc = itm
    } else {
      acc = acc.filter(login => itm.includes(login))
    }

    return acc
  }, [])


  return filteredFollowersList
}