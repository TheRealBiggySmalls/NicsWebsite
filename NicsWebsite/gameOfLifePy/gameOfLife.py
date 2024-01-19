import pygame as pg
import numpy as np

#GAME OF LIFE RULES:
#A living cell dies if it has fewer than two living neighboring cells.
#A living cell with two or three living neighbors lives on.
#A living cell with more than three living neighboring cells dies in the next time step.
#A dead cell is revived if it has exactly three living neighboring cells.

def generate_blank_pattern(dimy, dimx): #returns a blank array of cells
    cells = np.zeros((dimy, dimx))
    return cells

def generate_random_pattern(dimy, dimx): #returns a random array of cells
    cells = generate_blank_pattern(dimy, dimx)
    for i in range(dimy):
        for j in range(dimx):
            cells[i,j] = np.random.randint(0,2)
    return cells

def init(dimx, dimy):
    cells = generate_random_pattern(dimy, dimx)
    #cells[pos[0]:pos[0]+pattern.shape[0], pos[1]:pos[1]+pattern.shape[1]] = pattern
    return cells

def update(gameSurface, oldPattern, pixelSize):
    #cur = current pattern
    #sz = meta size for pixels in game holder
    #surface = the gameObject
    newPattern = generate_blank_pattern()

    for y, x in np.ndindex(oldPattern.shape):
        #[r-1 is previous cells, r+2=r+1 because of upper indexing, same as [r-1:r+1), ]
        aliveNeighbours = np.sum(oldPattern[y-1:y+2, x-1:x+2]) - oldPattern[y, x]

        if oldPattern[y,x]==1 and (aliveNeighbours == 2 or aliveNeighbours == 3): #2 or 3 neighbours a cell lives on
            newPattern[y,x] = 1
        elif oldPattern[y,x]==0 and aliveNeighbours == 3: #3 neighbours and a dead cell revives
            newPattern[y,x] = 1
        else:
            newPattern[y,x] = 0 #any other situation and the cell dies

        #why is this draw step here?
        pg.draw.rect(gameSurface, newPattern, (x*pixelSize, y*pixelSize, pixelSize-1, pixelSize-1))
    
    return newPattern

def main(dimx, dimy, cellsize):

    #upper constraints on size in case of silly buggers
    if dimx >200:
        dimx = 200
    if dimy >200:
        dimy=200

    surface = pg.display.set_mode((dimx * cellsize, dimy * cellsize))
    #pg.display.set_caption("John Conway's Game of Life")

    cells = init(dimx, dimy)
    surface.fill(cells)

    while True:
        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                return

        cells = update(surface, cells, cellsize)
        #surface.fill(cells) uncomment?
        pg.display.update()