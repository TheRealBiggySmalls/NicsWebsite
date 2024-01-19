import pygame as pg
import numpy as np

#GAME OF LIFE RULES:
#A living cell dies if it has fewer than two living neighboring cells.
#A living cell with two or three living neighbors lives on.
#A living cell with more than three living neighboring cells dies in the next time step.
#A dead cell is revived if it has exactly three living neighboring cells.

#COLOUR DEFINITIONS
col_about_to_die = (200, 200, 225)
aliveColour = (255, 255, 215)
backgroundColour = (10, 10, 40)
gridColour = (30, 30, 60)

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
    y, x = oldPattern.shape

    newPattern = generate_blank_pattern(y, x)

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
        colours = aliveColour if newPattern[y, x] == 1 else backgroundColour
        pg.draw.rect(gameSurface, colours, (x*pixelSize, y*pixelSize, pixelSize-1, pixelSize-1))
    
    return newPattern

def main(dimx, dimy, cellsize):

    #upper constraints on size in case of silly buggers
    if dimx >150:
        dimx = 150
    if dimy >150:
        dimy=150

    surface = pg.display.set_mode((dimx * cellsize, dimy * cellsize))
    #pg.display.set_caption("John Conway's Game of Life")

    cells = init(dimx, dimy)

    while True:
        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                return

        surface.fill(gridColour)
        cells = update(surface, cells, cellsize)
        #surface.fill(cells) uncomment?
        pg.display.update()

if __name__ == "__main__":
    #TODO: ask user to input dimensions here
    main(150, 150, 4)




#TODO: make game of life but it's x and dots printed