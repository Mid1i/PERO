import ContentLoader from "react-content-loader";

export default function LoadingFilters() {
    return (
        <ContentLoader 
            speed={2}
            width={700}
            height={40}
            viewBox="0 0 700 40"
            backgroundColor="#FFFFFF"
            foregroundColor="#ECEBEB"
        > 
            <rect x="0" y="0" rx="20" ry="20" width="160" height="40" /> 
            <rect x="175" y="0" rx="20" ry="20" width="160" height="40" />
            <rect x="350" y="0" rx="20" ry="20" width="160" height="40" />
            <rect x="525" y="0" rx="20" ry="20" width="160" height="40" />
        </ContentLoader>
    )
}