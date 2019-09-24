declare const getImage: ({ build, image }: {
    build?: string | undefined;
    image?: string | undefined;
}) => void | {} | {
    image: string;
};
export default getImage;
