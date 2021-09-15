import {Link} from '@do-while-for-each/browser-router-react-tools'
import React from 'react'

export function TransformsPage() {
  return (
    <div>
      <Link href="/transforms/constant-distance">Constant distance</Link><br/><br/>
      <Link href="/transforms/resize-observer">Resize observer</Link><br/><br/>
      <h1>Transform</h1>
      <Link href="/transforms/transform-dom">DOM</Link><br/><br/>
      <Link href="/transforms/transform-canvas">Canvas</Link><br/><br/>
      <Link href="/transforms/to-new-coordinate-system">To new coordinate system</Link><br/><br/>
    </div>
  );
}
