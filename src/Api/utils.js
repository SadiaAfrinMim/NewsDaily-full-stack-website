import axios from 'axios'
// Upload image and return image url


export const checkPremiumStatus = (user) => {
  if (!user || user.plan !== 'premium') return false;

  const { timestamp } = user;
  const currentTime = new Date().getTime();
  const planDurationMs = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
  const expirationTime = timestamp + planDurationMs;

  return currentTime <= expirationTime;
};


export const imageUpload = async imageData => {
  const formData = new FormData()
  formData.append('image', imageData)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  )
  return data.data.display_url
}

export const saveUser = async user => {
  await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    name: user?.displayName,
    image: user?.photoURL,
    email: user?.email,
    isSubscribed:false
  })
}