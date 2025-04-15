export const getRandomAvatar = (seed?: string | number): string => {
    const avatarSeed = seed
        ? seed.toString()
        : Math.floor(Math.random() * 1000);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`;
};

export const getRandomPostImage = (seed?: string | number): string => {
    const width = 800;
    const height = 600;
    const imageSeed = seed ? seed.toString() : Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${imageSeed}/${width}/${height}`;
};

export const getRandomColor = (): string => {
    const colors = [
        "bg-blue-100",
        "bg-green-100",
        "bg-purple-100",
        "bg-yellow-100",
        "bg-red-100",
        "bg-indigo-100",
        "bg-pink-100",
        "bg-teal-100",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
