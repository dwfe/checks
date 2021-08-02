import {Link} from '@do-while-for-each/browser-router-react-tools'
import React from 'react'

export function TransformsPage() {
  return (
    <div>
      <Link href="/transforms/constant-distance">Constant distance</Link><br/><br/>
      <Link href="/transforms/resize-observer">Resize observer</Link><br/><br/>
      <Link href="/transforms/transform-dom">Transform DOM</Link><br/><br/>
      <Link href="/transforms/transform-canvas">Transform Canvas</Link><br/><br/>
    </div>
  );
}
