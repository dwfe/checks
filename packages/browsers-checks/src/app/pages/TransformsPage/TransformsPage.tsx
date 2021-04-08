import {Link} from '@do-while-for-each/browser-router-react-tools';
import React from 'react'

export function TransformsPage() {
  return (
    <div>
      <Link href="/transforms/constant-distance">Constant distance</Link><br/><br/>
      <Link href="/transforms/resize-observer">Resize observer</Link><br/><br/>
    </div>
  );
}
