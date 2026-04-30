import './Skeleton.css';
//exported the skeletonBase
export const SkeletonBase = ({ type, className = "" }) => {
  return <div className={`skeleton skeleton-${type} ${className}`} />;
};

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <SkeletonBase type="title" />
    <SkeletonBase type="text" />
    <SkeletonBase type="text" />
    <SkeletonBase type="text" style={{ width: '80%' }} />
  </div>
);

export const SkeletonHero = () => (
  <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
    <SkeletonBase type="title" style={{ margin: '0 auto 1.5rem', width: '40%', height: '3.5rem' }} />
    <SkeletonBase type="text" style={{ margin: '0 auto', width: '30%' }} />
    <SkeletonBase type="text" style={{ margin: '1rem auto 0', width: '20%' }} />
  </div>
);

export const SkeletonMap = () => (
  <div className="skeleton-card" style={{ height: '300px', width: '100%', marginBottom: '2rem' }}>
    <SkeletonBase type="title" style={{ height: '100%', width: '100%', margin: 0, opacity: 0.5 }} />
  </div>
);
