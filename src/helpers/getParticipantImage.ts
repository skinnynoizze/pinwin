// src/helpers/participantUtils.ts

// Custom images mapping
const customImages: { [key: string]: string } = {
  'Donald Trump': '/images/opponents/donald-trump.webp',
  'Kamala Harris': '/images/opponents/kamala-harris.webp',
  // Add more participants and their corresponding images here
}

/**
 * Function to get the participant image.
 * @param name - The name of the participant.
 * @param defaultImage - The default image to use if the participant is not in the custom images.
 * @returns The appropriate image URL.
 */
export const getParticipantImage = (name: string, defaultImage: string): string => {
  return customImages[name] || defaultImage // Return custom image or original image
}
