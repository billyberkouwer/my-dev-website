"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export function Studio() {
  return (
    <div style={{position: 'absolute', width: '100%'}}>
      <NextStudio config={config} />
    </div>
  );
}
