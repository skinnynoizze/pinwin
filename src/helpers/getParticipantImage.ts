// src/utils/getParticipantImage.ts

const customImages: { [key: string]: string } = {
  'Donald Trump': '/images/opponents/donald-trump.webp',
  'Kamala Harris': '/images/opponents/kamala-harris.webp',
  // Add more participants and their corresponding images here
}

export const getParticipantImage = (name: string): string => {
  return customImages[name] || '/path/to/default/image.webp' // Fallback to a default image if not found
}
