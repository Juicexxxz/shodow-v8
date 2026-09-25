
export function initParticles() {
  const c = document.querySelector('#particle-canvas')
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  let w=0,h=0,dpr=1,particles=[]
  const resize=()=>{
    dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight
    c.width=w*dpr;c.height=h*dpr;c.style.width=w+'px';c.style.height=h+'px'
    ctx.setTransform(dpr,0,0,dpr,0,0)
    const n=reduce?30:Math.min(140,Math.floor(w/9))
    particles=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.7+.2,vx:(Math.random()-.5)*.25,vy:-Math.random()*.35-.02,a:Math.random()*.65+.08,cyan:Math.random()<.12}))
  }
  const draw=()=>{
    ctx.clearRect(0,0,w,h)
    for(const p of particles){
      p.x+=p.vx;p.y+=p.vy;if(p.y<-5)p.y=h+5;if(p.x<-5)p.x=w+5;if(p.x>w+5)p.x=-5
      ctx.beginPath();ctx.fillStyle=p.cyan?`rgba(110,234,255,${p.a})`:`rgba(255,38,60,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()
    }
    requestAnimationFrame(draw)
  }
  addEventListener('resize',resize);resize();requestAnimationFrame(draw)
}
