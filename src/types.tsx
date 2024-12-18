export interface PageProps {
    setPage: React.Dispatch<React.SetStateAction<{ postType: string}>>;
}

export type GamePageProps = {
    setGamePage: (page: string) => void;
}