import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './SkeletonStyle.css';
export default function ComponentSkeleton(){
  return(
  <div className="Container">
    <ul>
        {Array(8)
          .fill()
          .map((item, Key) => (
            <li key={Key}>
              <div className="Skeleton-group">
                <div className="Item-Header">
                  <div className="Item-title">
                    <Skeleton height={50} width={'100px'} />
                  </div>
                  <div className="Item-Icon">
                    <Skeleton height={50} width={'50px'} />
                  </div>
                </div>
                <div className="Item-body">
                  <Skeleton height={100} width={'100%'} />
                </div>
                <div className="Item-value">
                  <Skeleton height={50} width={'100%'} />
                </div>
              </div> 
            </li>
        ))}
      </ul>
    </div>
  );
}